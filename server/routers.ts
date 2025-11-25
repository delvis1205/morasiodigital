import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
    register: publicProcedure
      .input(z.object({
        email: z.string().email(),
        password: z.string().min(6),
        confirmPassword: z.string().min(6),
        firstName: z.string(),
        lastName: z.string(),
        phone: z.string(),
      }))
      .mutation(async ({ input }) => {
        const { getUserByEmail, createUser } = await import("./db");
        const bcrypt = await import("bcryptjs");
        
        // Check if user already exists
        const existingUser = await getUserByEmail(input.email);
        if (existingUser) throw new Error("Email ja registrado");
        
        // Validate passwords match
        if (input.password !== input.confirmPassword) throw new Error("Senhas nao correspondem");
        
        // Hash password
        const hashedPassword = await bcrypt.hash(input.password, 10);
        
        // Create user
        const result = await createUser({
          openId: `local_${input.email}`,
          email: input.email,
          password: hashedPassword,
          firstName: input.firstName,
          lastName: input.lastName,
          phone: input.phone,
          loginMethod: "local",
          role: "user",
        });
        
        return { success: true };
      }),
    
    login: publicProcedure
      .input(z.object({
        email: z.string().email(),
        password: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        const { getUserByEmail } = await import("./db");
        const bcrypt = await import("bcryptjs");
        
        const user = await getUserByEmail(input.email);
        if (!user || !user.password) throw new Error("Email ou senha invalidos");
        
        const isValidPassword = await bcrypt.compare(input.password, user.password);
        if (!isValidPassword) throw new Error("Email ou senha invalidos");
        
        // Create JWT session token using SDK
        const { sdk } = await import("./_core/sdk");
        const sessionToken = await sdk.createSessionToken(user.openId, {
          name: user.firstName || user.name || "",
        });
        
        // Set session cookie with maxAge
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, sessionToken, {
          ...cookieOptions,
          maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year in milliseconds
        });
        
        return { user };
      }),
  }),

  // User Profile
  user: router({
    profile: protectedProcedure.query(async ({ ctx }) => {
      const { getUserById } = await import("./db");
      return getUserById(ctx.user.id);
    }),
    
    updateProfile: protectedProcedure
      .input(z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        phone: z.string().optional(),
        deliveryAddress: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const { updateUser } = await import("./db");
        return updateUser(ctx.user.id, input);
      }),
    
    gameData: protectedProcedure.query(async ({ ctx }) => {
      const { getUserGameData } = await import("./db");
      return getUserGameData(ctx.user.id);
    }),
    
    addGameData: protectedProcedure
      .input(z.object({
        gameType: z.string(),
        gameId: z.string(),
        gameNickname: z.string().optional(),
        isDefault: z.number().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const { createUserGameData } = await import("./db");
        return createUserGameData({
          userId: ctx.user.id,
          ...input,
        });
      }),
    
    updateGameData: protectedProcedure
      .input(z.object({
        gameDataId: z.number(),
        gameNickname: z.string().optional(),
        gameId: z.string().optional(),
        isDefault: z.number().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const { updateUserGameData } = await import("./db");
        const { gameDataId, ...updateData } = input;
        return updateUserGameData(gameDataId, updateData);
      }),
    
    deleteGameData: protectedProcedure
      .input(z.number())
      .mutation(async ({ input }) => {
        const { deleteUserGameData } = await import("./db");
        return deleteUserGameData(input);
      }),
    
    orders: protectedProcedure.query(async ({ ctx }) => {
      const { getUserOrders } = await import("./db");
      return getUserOrders(ctx.user.id);
    }),
  }),

  // Public routes
  categories: router({
    list: publicProcedure.query(async () => {
      const { getAllCategories } = await import("./db");
      return getAllCategories();
    }),
  }),

  products: router({
    list: publicProcedure
      .input(z.object({
        categoryId: z.number().optional(),
        isFeatured: z.number().optional(),
      }).optional())
      .query(async ({ input }) => {
        const { getAllProducts } = await import("./db");
        return getAllProducts({ ...input, isActive: 1 });
      }),
    
    getById: publicProcedure
      .input(z.number())
      .query(async ({ input }) => {
        const { getProductById } = await import("./db");
        return getProductById(input);
      }),
    
    getBySlug: publicProcedure
      .input(z.string())
      .query(async ({ input }) => {
        const { getProductBySlug } = await import("./db");
        return getProductBySlug(input);
      }),
  }),

  orders: router({
    create: publicProcedure
      .input(z.object({
        customerName: z.string(),
        customerEmail: z.string().email().optional(),
        customerPhone: z.string(),
        playerId: z.string(),
        playerNickname: z.string().optional(),
        gameName: z.string(),
        productId: z.number(),
        productName: z.string(),
        productPrice: z.number(),
        quantity: z.number().default(1),
        totalAmount: z.number(),
        paymentMethod: z.enum(["express", "paypay", "unitel", "iban_bai", "iban_bfa", "presencial"]),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const { createOrder } = await import("./db");
        const { notifyOwner } = await import("./_core/notification");
        
        // Generate order number
        const orderNumber = `MD${Date.now()}${Math.floor(Math.random() * 1000)}`;
        
        const orderData = {
          ...input,
          orderNumber,
          userId: ctx.user?.id,
          status: "pending" as const,
        };
        
        await createOrder(orderData);
        
        // Notify owner
        const paymentMethodNames: Record<string, string> = {
          express: "Express",
          paypay: "PayPay AO",
          unitel: "Unitel Money",
          iban_bai: "IBAN Banco Bai",
          iban_bfa: "IBAN Banco BFA",
          presencial: "Pagamento Presencial",
        };
        
        await notifyOwner({
          title: `Novo Pedido: ${orderNumber}`,
          content: `Cliente: ${input.customerName}\nJogo: ${input.gameName}\nProduto: ${input.productName}\nPreço: ${(input.totalAmount / 100).toFixed(2)} Kz\nID: ${input.playerId}\nNickname: ${input.playerNickname || "N/A"}\nMétodo de Pagamento: ${paymentMethodNames[input.paymentMethod]}\nTelefone: ${input.customerPhone}`,
        });
        
        return { orderNumber };
      }),
    
    getByNumber: publicProcedure
      .input(z.string())
      .query(async ({ input }) => {
        const { getOrderByNumber } = await import("./db");
        return getOrderByNumber(input);
      }),
    
    uploadProof: publicProcedure
      .input(z.object({
        orderNumber: z.string(),
        fileData: z.string(), // base64
        fileName: z.string(),
        mimeType: z.string(),
      }))
      .mutation(async ({ input }) => {
        const { getOrderByNumber } = await import("./db");
        const { getDb } = await import("./db");
        const { storagePut } = await import("./storage");
        const { orders } = await import("../drizzle/schema");
        const { eq } = await import("drizzle-orm");
        
        const order = await getOrderByNumber(input.orderNumber);
        if (!order) throw new Error("Order not found");
        
        // Upload to S3
        const buffer = Buffer.from(input.fileData, "base64");
        const fileKey = `order-proofs/${input.orderNumber}-${Date.now()}-${input.fileName}`;
        const { url } = await storagePut(fileKey, buffer, input.mimeType);
        
        // Update order
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        await db.update(orders).set({ proofUrl: url, proofFileKey: fileKey }).where(eq(orders.id, order.id));
        
        return { url };
      }),
  }),

  // Admin routes
  admin: router({
    // Products management
    products: router({
      list: protectedProcedure.query(async ({ ctx }) => {
        if (ctx.user.role !== "admin") throw new Error("Unauthorized");
        const { getAllProducts } = await import("./db");
        return getAllProducts();
      }),
      
      create: protectedProcedure
        .input(z.object({
          categoryId: z.number(),
          name: z.string(),
          slug: z.string(),
          description: z.string().optional(),
          shortDescription: z.string().optional(),
          imageUrl: z.string().optional(),
          price: z.number(),
          originalPrice: z.number().optional(),
          bonus: z.string().optional(),
          isActive: z.number().default(1),
          isFeatured: z.number().default(0),
        }))
        .mutation(async ({ input, ctx }) => {
          if (ctx.user.role !== "admin") throw new Error("Unauthorized");
          const { getDb } = await import("./db");
          const { products } = await import("../drizzle/schema");
          const db = await getDb();
          if (!db) throw new Error("Database not available");
          return db.insert(products).values(input);
        }),
      
      update: protectedProcedure
        .input(z.object({
          id: z.number(),
          data: z.object({
            categoryId: z.number().optional(),
            name: z.string().optional(),
            slug: z.string().optional(),
            description: z.string().optional(),
            shortDescription: z.string().optional(),
            imageUrl: z.string().optional(),
            price: z.number().optional(),
            originalPrice: z.number().optional(),
            bonus: z.string().optional(),
            isActive: z.number().optional(),
            isFeatured: z.number().optional(),
          }),
        }))
        .mutation(async ({ input, ctx }) => {
          if (ctx.user.role !== "admin") throw new Error("Unauthorized");
          const { getDb } = await import("./db");
          const { products } = await import("../drizzle/schema");
          const { eq } = await import("drizzle-orm");
          const db = await getDb();
          if (!db) throw new Error("Database not available");
          return db.update(products).set(input.data).where(eq(products.id, input.id));
        }),
      
      delete: protectedProcedure
        .input(z.number())
        .mutation(async ({ input, ctx }) => {
          if (ctx.user.role !== "admin") throw new Error("Unauthorized");
          const { getDb } = await import("./db");
          const { products } = await import("../drizzle/schema");
          const { eq } = await import("drizzle-orm");
          const db = await getDb();
          if (!db) throw new Error("Database not available");
          return db.delete(products).where(eq(products.id, input));
        }),
      
      uploadImage: protectedProcedure
        .input(z.object({
          fileData: z.string(),
          fileName: z.string(),
          mimeType: z.string(),
        }))
        .mutation(async ({ input, ctx }) => {
          if (ctx.user.role !== "admin") throw new Error("Unauthorized");
          const { storagePut } = await import("./storage");
          
          const buffer = Buffer.from(input.fileData, "base64");
          const timestamp = Date.now();
          const random = Math.floor(Math.random() * 10000);
          const fileKey = `products/${timestamp}-${random}-${input.fileName}`;
          
          const { url } = await storagePut(fileKey, buffer, input.mimeType);
          return { url, fileKey };
        }),
    }),
    
    // Categories management
    categories: router({
      list: protectedProcedure.query(async ({ ctx }) => {
        if (ctx.user.role !== "admin") throw new Error("Unauthorized");
        const { getDb } = await import("./db");
        const { categories } = await import("../drizzle/schema");
        const db = await getDb();
        if (!db) return [];
        return db.select().from(categories);
      }),
      
      create: protectedProcedure
        .input(z.object({
          name: z.string(),
          slug: z.string(),
          description: z.string().optional(),
          imageUrl: z.string().optional(),
          isActive: z.number().default(1),
        }))
        .mutation(async ({ input, ctx }) => {
          if (ctx.user.role !== "admin") throw new Error("Unauthorized");
          const { getDb } = await import("./db");
          const { categories } = await import("../drizzle/schema");
          const db = await getDb();
          if (!db) throw new Error("Database not available");
          return db.insert(categories).values(input);
        }),
      
      update: protectedProcedure
        .input(z.object({
          id: z.number(),
          data: z.object({
            name: z.string().optional(),
            slug: z.string().optional(),
            description: z.string().optional(),
            imageUrl: z.string().optional(),
            isActive: z.number().optional(),
          }),
        }))
        .mutation(async ({ input, ctx }) => {
          if (ctx.user.role !== "admin") throw new Error("Unauthorized");
          const { getDb } = await import("./db");
          const { categories } = await import("../drizzle/schema");
          const { eq } = await import("drizzle-orm");
          const db = await getDb();
          if (!db) throw new Error("Database not available");
          return db.update(categories).set(input.data).where(eq(categories.id, input.id));
        }),
    }),
    
    // Orders management
    orders: router({
      list: protectedProcedure.query(async ({ ctx }) => {
        if (ctx.user.role !== "admin") throw new Error("Unauthorized");
        const { getAllOrders } = await import("./db");
        return getAllOrders();
      }),
      
      updateStatus: protectedProcedure
        .input(z.object({
          orderId: z.number(),
          status: z.enum(["pending", "paid", "processing", "completed", "cancelled"]),
          adminNotes: z.string().optional(),
        }))
        .mutation(async ({ input, ctx }) => {
          if (ctx.user.role !== "admin") throw new Error("Unauthorized");
          const { updateOrderStatus } = await import("./db");
          return updateOrderStatus(input.orderId, input.status, input.adminNotes);
        }),
      
      stats: protectedProcedure.query(async ({ ctx }) => {
        if (ctx.user.role !== "admin") throw new Error("Unauthorized");
        const { getAllOrders } = await import("./db");
        const orders = await getAllOrders();
        
        const totalOrders = orders.length;
        const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
        const pendingOrders = orders.filter(o => o.status === "pending").length;
        const completedOrders = orders.filter(o => o.status === "completed").length;
        
        return {
          totalOrders,
          totalRevenue,
          pendingOrders,
          completedOrders,
        };
      }),
    }),

    // Banners management
    banners: router({
      list: protectedProcedure.query(async ({ ctx }) => {
        if (ctx.user.role !== "admin") throw new Error("Unauthorized");
        const { getAllBanners } = await import("./db");
        return getAllBanners();
      }),
      
      create: protectedProcedure
        .input(z.object({
          title: z.string(),
          imageUrl: z.string(),
          linkUrl: z.string().optional(),
          description: z.string().optional(),
          order: z.number().default(0),
          isActive: z.number().default(1),
        }))
        .mutation(async ({ input, ctx }) => {
          if (ctx.user.role !== "admin") throw new Error("Unauthorized");
          const { createBanner } = await import("./db");
          return createBanner(input);
        }),
      
      update: protectedProcedure
        .input(z.object({
          id: z.number(),
          data: z.object({
            title: z.string().optional(),
            imageUrl: z.string().optional(),
            linkUrl: z.string().optional(),
            description: z.string().optional(),
            order: z.number().optional(),
            isActive: z.number().optional(),
          }),
        }))
        .mutation(async ({ input, ctx }) => {
          if (ctx.user.role !== "admin") throw new Error("Unauthorized");
          const { updateBanner } = await import("./db");
          return updateBanner(input.id, input.data);
        }),
      
      delete: protectedProcedure
        .input(z.number())
        .mutation(async ({ input, ctx }) => {
          if (ctx.user.role !== "admin") throw new Error("Unauthorized");
          const { deleteBanner } = await import("./db");
          return deleteBanner(input);
        }),
      
      uploadImage: protectedProcedure
        .input(z.object({
          fileData: z.string(),
          fileName: z.string(),
          mimeType: z.string(),
        }))
        .mutation(async ({ input, ctx }) => {
          if (ctx.user.role !== "admin") throw new Error("Unauthorized");
          const { storagePut } = await import("./storage");
          
          const buffer = Buffer.from(input.fileData, "base64");
          const timestamp = Date.now();
          const random = Math.floor(Math.random() * 10000);
          const fileKey = `banners/${timestamp}-${random}-${input.fileName}`;
          
          const { url } = await storagePut(fileKey, buffer, input.mimeType);
          return { url, fileKey };
        }),
    }),
    
    // Blog management
    blog: router({
      list: protectedProcedure.query(async ({ ctx }) => {
        if (ctx.user.role !== "admin") throw new Error("Unauthorized");
        const { getAllBlogPosts } = await import("./db");
        return getAllBlogPosts();
      }),
      
      create: protectedProcedure
        .input(z.object({
          title: z.string(),
          slug: z.string(),
          content: z.string(),
          excerpt: z.string().optional(),
          imageUrl: z.string().optional(),
          category: z.string().optional(),
          author: z.string().default("Morásio Digital"),
          isPublished: z.number().default(1),
        }))
        .mutation(async ({ input, ctx }) => {
          if (ctx.user.role !== "admin") throw new Error("Unauthorized");
          const { createBlogPost } = await import("./db");
          return createBlogPost(input);
        }),
      
      update: protectedProcedure
        .input(z.object({
          id: z.number(),
          data: z.object({
            title: z.string().optional(),
            slug: z.string().optional(),
            content: z.string().optional(),
            excerpt: z.string().optional(),
            imageUrl: z.string().optional(),
            category: z.string().optional(),
            author: z.string().optional(),
            isPublished: z.number().optional(),
          }),
        }))
        .mutation(async ({ input, ctx }) => {
          if (ctx.user.role !== "admin") throw new Error("Unauthorized");
          const { updateBlogPost } = await import("./db");
          return updateBlogPost(input.id, input.data);
        }),
      
      delete: protectedProcedure
        .input(z.number())
        .mutation(async ({ input, ctx }) => {
          if (ctx.user.role !== "admin") throw new Error("Unauthorized");
          const { deleteBlogPost } = await import("./db");
          return deleteBlogPost(input);
        }),
    }),
    
    // Reviews management
    reviews: router({
      list: protectedProcedure.query(async ({ ctx }) => {
        if (ctx.user.role !== "admin") throw new Error("Unauthorized");
        const { getAllReviews } = await import("./db");
        return getAllReviews();
      }),
      
      verify: protectedProcedure
        .input(z.number())
        .mutation(async ({ input, ctx }) => {
          if (ctx.user.role !== "admin") throw new Error("Unauthorized");
          const { verifyReview } = await import("./db");
          return verifyReview(input);
        }),
      
      delete: protectedProcedure
        .input(z.number())
        .mutation(async ({ input, ctx }) => {
          if (ctx.user.role !== "admin") throw new Error("Unauthorized");
          const { deleteReview } = await import("./db");
          return deleteReview(input);
        }),
    }),

    // Admin management
    admins: router({
      createAdmin: protectedProcedure
        .input(z.object({
          email: z.string().email(),
          password: z.string().min(6),
          firstName: z.string(),
          lastName: z.string(),
        }))
        .mutation(async ({ input, ctx }) => {
          if (ctx.user.role !== "admin") throw new Error("Unauthorized");
          const { getUserByEmail, createUser } = await import("./db");
          const bcrypt = await import("bcryptjs");
          
          const existingUser = await getUserByEmail(input.email);
          if (existingUser) throw new Error("Email ja registrado");
          
          const hashedPassword = await bcrypt.hash(input.password, 10);
          
          await createUser({
            openId: `admin_${input.email}`,
            email: input.email,
            password: hashedPassword,
            firstName: input.firstName,
            lastName: input.lastName,
            loginMethod: "local",
            role: "admin",
          });
          
          return { success: true };
        }),
    }),
  }),

  // Notifications
  notifications: router({
    getByOrderId: publicProcedure
      .input(z.number())
      .query(async ({ input }) => {
        const { getNotificationsByOrderId } = await import("./db");
        return getNotificationsByOrderId(input);
      }),
    
    getByUserId: protectedProcedure
      .query(async ({ ctx }) => {
        const { getNotificationsByUserId } = await import("./db");
        return getNotificationsByUserId(ctx.user.id);
      }),
    
    markAsRead: protectedProcedure
      .input(z.number())
      .mutation(async ({ input }) => {
        const { markNotificationAsRead } = await import("./db");
        return markNotificationAsRead(input);
      }),
  }),

  apiConfig: router({
    getAll: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") throw new Error("Unauthorized");
      const { getAllApiConfigurations } = await import("./db");
      return getAllApiConfigurations();
    }),
    
    getByProvider: protectedProcedure
      .input(z.string())
      .query(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") throw new Error("Unauthorized");
        const { getApiConfiguration } = await import("./db");
        return getApiConfiguration(input);
      }),
    
    updateWhatsApp: protectedProcedure
      .input(z.object({
        accountId: z.string().optional(),
        phoneNumberId: z.string().optional(),
        accessToken: z.string().optional(),
        isActive: z.number().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") throw new Error("Unauthorized");
        const { createOrUpdateApiConfiguration } = await import("./db");
        return createOrUpdateApiConfiguration("whatsapp", input);
      }),
  }),
  chat: router({
    sendMessage: publicProcedure
      .input(z.object({
        message: z.string(),
      }))
      .mutation(async ({ input }) => {
        const { invokeLLM } = await import("./_core/llm");
        
        try {
          const response = await invokeLLM({
            messages: [
              {
                role: "system",
                content: `Você é Freth RJA, assistente virtual da Morásio Digital. 

Instruções importantes:
- NÃO se apresente em cada mensagem. Você já foi apresentado no início da conversa.
- Formate suas respostas com quebras de linha e organização clara
- Use listas numeradas ou com bullet points quando apropriado
- Separe tópicos diferentes com linhas em branco
- Seja conciso e profissional
- Responda sobre produtos, pagamentos, pedidos e políticas

Quando a pergunta for complexa demais, sugira contato via WhatsApp: +244 923 929 712`,
              },
              {
                role: "user",
                content: input.message,
              },
            ],
          });

          const content = response.choices?.[0]?.message?.content;
          const reply = typeof content === 'string' ? content : "Desculpe, não consegui processar sua pergunta.";
          const needsWhatsApp = reply.toLowerCase().includes("whatsapp");
          
          return { reply, needsWhatsApp };
        } catch (error) {
          return {
            reply: "Desculpe, ocorreu um erro. Entre em contato via WhatsApp: +244 923 929 712",
            needsWhatsApp: true,
          };
        }
      }),
  }),
  support: router({
    sendMessage: publicProcedure
      .input(z.object({
        name: z.string(),
        email: z.string().email(),
        phone: z.string().optional(),
        subject: z.string().optional(),
        message: z.string(),
      }))
      .mutation(async ({ input }) => {
        const { notifyOwner } = await import("./_core/notification");
        
        try {
          await notifyOwner({
            title: `Nova mensagem de suporte de ${input.name}`,
            content: `Email: ${input.email}\nTelefone: ${input.phone || "Não informado"}\nAssunto: ${input.subject || "Sem assunto"}\n\nMensagem:\n${input.message}`,
          });

          return { success: true };
        } catch (error) {
          console.error("Support message error:", error);
          return { success: false };
        }
      }),
  }),
  // Public Banners
  banners: router({
    getAll: publicProcedure.query(async () => {
      const { getAllBanners } = await import("./db");
      return await getAllBanners();
    }),
    getActive: publicProcedure.query(async () => {
      const { getActiveBanners } = await import("./db");
      return await getActiveBanners();
    }),
  }),
  
  // Public Blog
  blog: router({
    list: publicProcedure.query(async () => {
      const { getAllBlogPosts } = await import("./db");
      return getAllBlogPosts();
    }),
    getBySlug: publicProcedure
      .input(z.string())
      .query(async ({ input }) => {
        const { getBlogPostBySlug } = await import("./db");
        return getBlogPostBySlug(input);
      }),
  }),
  
  // Public Reviews
  reviews: router({
    getByProductId: publicProcedure
      .input(z.number())
      .query(async ({ input }) => {
        const { getReviewsByProductId } = await import("./db");
        return getReviewsByProductId(input);
      }),
    create: protectedProcedure
      .input(z.object({
        productId: z.number(),
        rating: z.number().min(1).max(5),
        title: z.string().optional(),
        comment: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        const { createReview } = await import("./db");
        return createReview({ ...input, userId: ctx.user.id });
      }),
  }),
  categories: router({
    getAll: publicProcedure.query(async () => {
      const { getAllCategories } = await import("./db");
      return await getAllCategories();
    }),
  }),
});

export type AppRouter = typeof appRouter;
