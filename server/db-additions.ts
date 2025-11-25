// Funções adicionais para Blog e Reviews
// Este arquivo contém as funções que devem ser adicionadas ao db.ts

// Blog Post helpers
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
