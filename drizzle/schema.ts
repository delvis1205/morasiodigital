import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  firstName: varchar("firstName", { length: 100 }),
  lastName: varchar("lastName", { length: 100 }),
  email: varchar("email", { length: 320 }).unique(),
  phone: varchar("phone", { length: 50 }),
  password: text("password"), // Hashed password for local auth
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  deliveryAddress: text("deliveryAddress"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Categories table for game categories
 */
export const categories = mysqlTable("categories", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  imageUrl: text("imageUrl"),
  isActive: int("isActive", { unsigned: true }).default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;

/**
 * Products table for game recharge products
 */
export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  categoryId: int("categoryId").notNull(),
  name: varchar("name", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  description: text("description"),
  shortDescription: varchar("shortDescription", { length: 500 }),
  imageUrl: text("imageUrl"),
  price: int("price").notNull(), // Price in Kwanzas (cents)
  originalPrice: int("originalPrice"), // Original price for discounts
  bonus: varchar("bonus", { length: 200 }),
  isActive: int("isActive", { unsigned: true }).default(1).notNull(),
  isFeatured: int("isFeatured", { unsigned: true }).default(0).notNull(),
  salesCount: int("salesCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

/**
 * Orders table for customer orders
 */
export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  orderNumber: varchar("orderNumber", { length: 50 }).notNull().unique(),
  userId: int("userId"),
  customerName: varchar("customerName", { length: 200 }).notNull(),
  customerEmail: varchar("customerEmail", { length: 320 }),
  customerPhone: varchar("customerPhone", { length: 50 }).notNull(),
  playerId: varchar("playerId", { length: 100 }).notNull(),
  playerNickname: varchar("playerNickname", { length: 100 }),
  gameName: varchar("gameName", { length: 100 }).notNull(),
  productId: int("productId").notNull(),
  productName: varchar("productName", { length: 200 }).notNull(),
  productPrice: int("productPrice").notNull(),
  quantity: int("quantity").default(1).notNull(),
  totalAmount: int("totalAmount").notNull(),
  paymentMethod: mysqlEnum("paymentMethod", ["express", "paypay", "unitel", "iban_bai", "iban_bfa", "presencial"]).notNull(),
  status: mysqlEnum("status", ["pending", "paid", "processing", "completed", "cancelled"]).default("pending").notNull(),
  proofUrl: text("proofUrl"),
  proofFileKey: text("proofFileKey"),
  notes: text("notes"),
  adminNotes: text("adminNotes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;
/**
 * Notifications table for order notifications
 */
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("orderId").notNull(),
  userId: int("userId"),
  type: mysqlEnum("type", ["order_created", "order_paid", "order_processing", "order_completed", "order_cancelled"]).notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  message: text("message").notNull(),
  isRead: int("isRead", { unsigned: true }).default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;

/**
 * User Game Data table for storing game information
 */
export const userGameData = mysqlTable("userGameData", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  gameType: varchar("gameType", { length: 100 }).notNull(), // Free Fire, Delta Force, etc
  gameId: varchar("gameId", { length: 100 }).notNull(),
  gameNickname: varchar("gameNickname", { length: 100 }),
  isDefault: int("isDefault", { unsigned: true }).default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserGameData = typeof userGameData.$inferSelect;
export type InsertUserGameData = typeof userGameData.$inferInsert;


/**
 * API Configurations table for storing API credentials
 */
export const apiConfigurations = mysqlTable("apiConfigurations", {
  id: int("id").autoincrement().primaryKey(),
  provider: varchar("provider", { length: 100 }).notNull().unique(), // whatsapp, stripe, etc
  accountId: text("accountId"),
  phoneNumberId: text("phoneNumberId"),
  accessToken: text("accessToken"),
  apiKey: text("apiKey"),
  apiSecret: text("apiSecret"),
  webhookUrl: text("webhookUrl"),
  isActive: int("isActive", { unsigned: true }).default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ApiConfiguration = typeof apiConfigurations.$inferSelect;
export type InsertApiConfiguration = typeof apiConfigurations.$inferInsert;

/**
 * Reviews table for product reviews
 */
export const reviews = mysqlTable("reviews", {
  id: int("id").autoincrement().primaryKey(),
  productId: int("productId").notNull(),
  userId: int("userId"),
  rating: int("rating").notNull(), // 1-5 stars
  title: varchar("title", { length: 200 }),
  comment: text("comment"),
  isVerified: int("isVerified", { unsigned: true }).default(0).notNull(),
  helpful: int("helpful").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;

/**
 * Blog posts table
 */
export const blogPosts = mysqlTable("blogPosts", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 300 }).notNull(),
  slug: varchar("slug", { length: 300 }).notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  imageUrl: text("imageUrl"),
  category: varchar("category", { length: 100 }),
  author: varchar("author", { length: 100 }).default("Morásio Digital").notNull(),
  isPublished: int("isPublished", { unsigned: true }).default(1).notNull(),
  viewCount: int("viewCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

/**
 * Banners table for homepage carousel
 */
export const banners = mysqlTable("banners", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  imageUrl: text("imageUrl").notNull(),
  linkUrl: text("linkUrl"),
  description: text("description"),
  order: int("order").default(0).notNull(),
  isActive: int("isActive", { unsigned: true }).default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type Banner = typeof banners.$inferSelect;
export type InsertBanner = typeof banners.$inferInsert;
