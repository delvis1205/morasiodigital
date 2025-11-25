import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Categories
export async function getAllCategories() {
  const db = await getDb();
  if (!db) return [];
  const { categories } = await import("../drizzle/schema");
  return db.select().from(categories).where(eq(categories.isActive, 1));
}

export async function getCategoryBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const { categories } = await import("../drizzle/schema");
  const result = await db.select().from(categories).where(eq(categories.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Products
export async function getAllProducts(filters?: { categoryId?: number; isActive?: number; isFeatured?: number }) {
  const db = await getDb();
  if (!db) return [];
  const { products } = await import("../drizzle/schema");
  const { and } = await import("drizzle-orm");
  
  const conditions = [];
  if (filters?.categoryId !== undefined) conditions.push(eq(products.categoryId, filters.categoryId));
  if (filters?.isActive !== undefined) conditions.push(eq(products.isActive, filters.isActive));
  if (filters?.isFeatured !== undefined) conditions.push(eq(products.isFeatured, filters.isFeatured));
  
  if (conditions.length > 0) {
    return db.select().from(products).where(and(...conditions));
  }
  return db.select().from(products);
}

export async function getProductById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const { products } = await import("../drizzle/schema");
  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getProductBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const { products } = await import("../drizzle/schema");
  const result = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Orders
export async function createOrder(order: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { orders } = await import("../drizzle/schema");
  const result = await db.insert(orders).values(order);
  return result;
}

export async function getOrderByNumber(orderNumber: string) {
  const db = await getDb();
  if (!db) return undefined;
  const { orders } = await import("../drizzle/schema");
  const result = await db.select().from(orders).where(eq(orders.orderNumber, orderNumber)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllOrders() {
  const db = await getDb();
  if (!db) return [];
  const { orders } = await import("../drizzle/schema");
  const { desc } = await import("drizzle-orm");
  return db.select().from(orders).orderBy(desc(orders.createdAt));
}

export async function updateOrderStatus(orderId: number, status: string, adminNotes?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { orders } = await import("../drizzle/schema");
  const updateData: any = { status };
  if (adminNotes) updateData.adminNotes = adminNotes;
  return db.update(orders).set(updateData).where(eq(orders.id, orderId));
}

// Notifications
export async function createNotification(notification: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { notifications } = await import("../drizzle/schema");
  return db.insert(notifications).values(notification);
}

export async function getNotificationsByOrderId(orderId: number) {
  const db = await getDb();
  if (!db) return [];
  const { notifications } = await import("../drizzle/schema");
  const { desc } = await import("drizzle-orm");
  return db.select().from(notifications).where(eq(notifications.orderId, orderId)).orderBy(desc(notifications.createdAt));
}

export async function getNotificationsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  const { notifications } = await import("../drizzle/schema");
  const { and, desc } = await import("drizzle-orm");
  return db.select().from(notifications).where(and(eq(notifications.userId, userId))).orderBy(desc(notifications.createdAt));
}

export async function markNotificationAsRead(notificationId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { notifications } = await import("../drizzle/schema");
  return db.update(notifications).set({ isRead: 1 }).where(eq(notifications.id, notificationId));
}


// User Management
export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createUser(userData: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(users).values(userData);
  return result;
}

export async function updateUser(userId: number, updateData: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(users).set(updateData).where(eq(users.id, userId));
}

// User Game Data
export async function getUserGameData(userId: number) {
  const db = await getDb();
  if (!db) return [];
  const { userGameData } = await import("../drizzle/schema");
  return db.select().from(userGameData).where(eq(userGameData.userId, userId));
}

export async function createUserGameData(gameData: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { userGameData } = await import("../drizzle/schema");
  return db.insert(userGameData).values(gameData);
}

export async function updateUserGameData(gameDataId: number, updateData: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { userGameData } = await import("../drizzle/schema");
  return db.update(userGameData).set(updateData).where(eq(userGameData.id, gameDataId));
}

export async function deleteUserGameData(gameDataId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { userGameData } = await import("../drizzle/schema");
  return db.delete(userGameData).where(eq(userGameData.id, gameDataId));
}

// User Orders
export async function getUserOrders(userId: number) {
  const db = await getDb();
  if (!db) return [];
  const { orders } = await import("../drizzle/schema");
  const { desc } = await import("drizzle-orm");
  return db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt));
}


// API Configurations
export async function getApiConfiguration(provider: string) {
  const db = await getDb();
  if (!db) return null;
  const { apiConfigurations } = await import("../drizzle/schema");
  const result = await db.select().from(apiConfigurations).where(eq(apiConfigurations.provider, provider)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getAllApiConfigurations() {
  const db = await getDb();
  if (!db) return [];
  const { apiConfigurations } = await import("../drizzle/schema");
  return db.select().from(apiConfigurations);
}

export async function createOrUpdateApiConfiguration(provider: string, config: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { apiConfigurations } = await import("../drizzle/schema");
  
  const existing = await getApiConfiguration(provider);
  if (existing) {
    return db.update(apiConfigurations).set({
      ...config,
      updatedAt: new Date(),
    }).where(eq(apiConfigurations.provider, provider));
  } else {
    return db.insert(apiConfigurations).values({
      provider,
      ...config,
    });
  }
}

export async function updateApiConfiguration(id: number, updateData: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { apiConfigurations } = await import("../drizzle/schema");
  return db.update(apiConfigurations).set(updateData).where(eq(apiConfigurations.id, id));
}

// Banner helpers
export async function getAllBanners() {
  const db = await getDb();
  if (!db) return [];
  const { banners } = await import("../drizzle/schema");
  return db.select().from(banners).orderBy(banners.order);
}

export async function getActiveBanners() {
  const db = await getDb();
  if (!db) return [];
  const { banners } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  return db.select().from(banners).where(eq(banners.isActive, 1)).orderBy(banners.order);
}

export async function createBanner(banner: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { banners } = await import("../drizzle/schema");
  await db.insert(banners).values(banner);
}

export async function updateBanner(id: number, banner: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { banners } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  await db.update(banners).set(banner).where(eq(banners.id, id));
}

export async function deleteBanner(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { banners } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  await db.delete(banners).where(eq(banners.id, id));
}

// Category helpers
export async function getAllBlogPosts() {
  const { getDb } = await import("./db");
  const db = await getDb();
  if (!db) return [];
  const { blogPosts } = await import("../drizzle/schema");
  const { desc, eq } = await import("drizzle-orm");
  return db.select().from(blogPosts).where(eq(blogPosts.isPublished, 1)).orderBy(desc(blogPosts.createdAt));
}

export async function getBlogPostBySlug(slug: string) {
  const { getDb } = await import("./db");
  const db = await getDb();
  if (!db) return undefined;
  const { blogPosts } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createBlogPost(post: any) {
  const { getDb } = await import("./db");
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { blogPosts } = await import("../drizzle/schema");
  return db.insert(blogPosts).values(post);
}

export async function updateBlogPost(id: number, post: any) {
  const { getDb } = await import("./db");
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { blogPosts } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  return db.update(blogPosts).set(post).where(eq(blogPosts.id, id));
}

export async function deleteBlogPost(id: number) {
  const { getDb } = await import("./db");
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { blogPosts } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  return db.delete(blogPosts).where(eq(blogPosts.id, id));
}

// Review helpers
export async function getAllReviews() {
  const { getDb } = await import("./db");
  const db = await getDb();
  if (!db) return [];
  const { reviews } = await import("../drizzle/schema");
  const { desc } = await import("drizzle-orm");
  return db.select().from(reviews).orderBy(desc(reviews.createdAt));
}

export async function getReviewsByProductId(productId: number) {
  const { getDb } = await import("./db");
  const db = await getDb();
  if (!db) return [];
  const { reviews } = await import("../drizzle/schema");
  const { eq, desc } = await import("drizzle-orm");
  return db.select().from(reviews).where(eq(reviews.productId, productId)).orderBy(desc(reviews.createdAt));
}

export async function createReview(review: any) {
  const { getDb } = await import("./db");
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { reviews } = await import("../drizzle/schema");
  return db.insert(reviews).values(review);
}

export async function verifyReview(id: number) {
  const { getDb } = await import("./db");
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { reviews } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  return db.update(reviews).set({ isVerified: 1 }).where(eq(reviews.id, id));
}

export async function deleteReview(id: number) {
  const { getDb } = await import("./db");
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { reviews } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  return db.delete(reviews).where(eq(reviews.id, id));
}
