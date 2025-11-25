import { drizzle } from "drizzle-orm/mysql2";
import { categories, products } from "./drizzle/schema.ts";

const db = drizzle(process.env.DATABASE_URL);

async function seed() {
  console.log("🌱 Iniciando seed do banco de dados...");

  // Categorias
  const categoriesData = [
    {
      name: "Free Fire",
      slug: "free-fire",
      description: "Diamantes e pacotes para Free Fire",
      imageUrl: "/games/free-fire.jpg",
      isActive: 1,
    },
    {
      name: "Delta Force",
      slug: "delta-force",
      description: "Moedas e itens para Delta Force",
      imageUrl: "/games/delta-force.png",
      isActive: 1,
    },
    {
      name: "Black Clover M",
      slug: "black-clover",
      description: "Cristais e recursos para Black Clover Mobile",
      imageUrl: "/games/black-clover.jpg",
      isActive: 1,
    },
  ];

  console.log("📁 Inserindo categorias...");
  await db.insert(categories).values(categoriesData);
  console.log("✅ Categorias inseridas!");

  // Produtos Free Fire
  const productsData = [
    // Free Fire (categoryId: 1)
    {
      categoryId: 1,
      name: "100 Diamantes",
      slug: "free-fire-100-diamantes",
      description: "100 Diamantes para Free Fire. Entrega instantânea após confirmação do pagamento.",
      shortDescription: "100 Diamantes + Bônus",
      imageUrl: "/games/free-fire.jpg",
      price: 50000, // 500 Kz
      bonus: "+10 Diamantes Bônus",
      isActive: 1,
      isFeatured: 1,
      salesCount: 0,
    },
    {
      categoryId: 1,
      name: "310 Diamantes",
      slug: "free-fire-310-diamantes",
      description: "310 Diamantes para Free Fire. Entrega instantânea após confirmação do pagamento.",
      shortDescription: "310 Diamantes + Bônus",
      imageUrl: "/games/free-fire.jpg",
      price: 150000, // 1500 Kz
      bonus: "+31 Diamantes Bônus",
      isActive: 1,
      isFeatured: 1,
      salesCount: 0,
    },
    {
      categoryId: 1,
      name: "520 Diamantes",
      slug: "free-fire-520-diamantes",
      description: "520 Diamantes para Free Fire. Entrega instantânea após confirmação do pagamento.",
      shortDescription: "520 Diamantes + Bônus",
      imageUrl: "/games/free-fire.jpg",
      price: 250000, // 2500 Kz
      originalPrice: 280000,
      bonus: "+52 Diamantes Bônus",
      isActive: 1,
      isFeatured: 1,
      salesCount: 0,
    },
    {
      categoryId: 1,
      name: "1060 Diamantes",
      slug: "free-fire-1060-diamantes",
      description: "1060 Diamantes para Free Fire. Entrega instantânea após confirmação do pagamento.",
      shortDescription: "1060 Diamantes + Bônus",
      imageUrl: "/games/free-fire.jpg",
      price: 500000, // 5000 Kz
      originalPrice: 560000,
      bonus: "+106 Diamantes Bônus",
      isActive: 1,
      isFeatured: 1,
      salesCount: 0,
    },
    {
      categoryId: 1,
      name: "2180 Diamantes",
      slug: "free-fire-2180-diamantes",
      description: "2180 Diamantes para Free Fire. Entrega instantânea após confirmação do pagamento.",
      shortDescription: "2180 Diamantes + Bônus",
      imageUrl: "/games/free-fire.jpg",
      price: 1000000, // 10000 Kz
      originalPrice: 1120000,
      bonus: "+218 Diamantes Bônus",
      isActive: 1,
      isFeatured: 1,
      salesCount: 0,
    },

    // Delta Force (categoryId: 2)
    {
      categoryId: 2,
      name: "500 Moedas",
      slug: "delta-force-500-moedas",
      description: "500 Moedas para Delta Force. Entrega instantânea após confirmação do pagamento.",
      shortDescription: "500 Moedas",
      imageUrl: "/games/delta-force.png",
      price: 60000, // 600 Kz
      isActive: 1,
      isFeatured: 0,
      salesCount: 0,
    },
    {
      categoryId: 2,
      name: "1200 Moedas",
      slug: "delta-force-1200-moedas",
      description: "1200 Moedas para Delta Force. Entrega instantânea após confirmação do pagamento.",
      shortDescription: "1200 Moedas + Bônus",
      imageUrl: "/games/delta-force.png",
      price: 140000, // 1400 Kz
      bonus: "+100 Moedas Bônus",
      isActive: 1,
      isFeatured: 1,
      salesCount: 0,
    },
    {
      categoryId: 2,
      name: "3000 Moedas",
      slug: "delta-force-3000-moedas",
      description: "3000 Moedas para Delta Force. Entrega instantânea após confirmação do pagamento.",
      shortDescription: "3000 Moedas + Bônus",
      imageUrl: "/games/delta-force.png",
      price: 350000, // 3500 Kz
      originalPrice: 400000,
      bonus: "+300 Moedas Bônus",
      isActive: 1,
      isFeatured: 1,
      salesCount: 0,
    },

    // Black Clover (categoryId: 3)
    {
      categoryId: 3,
      name: "500 Cristais",
      slug: "black-clover-500-cristais",
      description: "500 Cristais para Black Clover Mobile. Entrega instantânea após confirmação do pagamento.",
      shortDescription: "500 Cristais",
      imageUrl: "/games/black-clover.jpg",
      price: 55000, // 550 Kz
      isActive: 1,
      isFeatured: 0,
      salesCount: 0,
    },
    {
      categoryId: 3,
      name: "1200 Cristais",
      slug: "black-clover-1200-cristais",
      description: "1200 Cristais para Black Clover Mobile. Entrega instantânea após confirmação do pagamento.",
      shortDescription: "1200 Cristais + Bônus",
      imageUrl: "/games/black-clover.jpg",
      price: 130000, // 1300 Kz
      bonus: "+120 Cristais Bônus",
      isActive: 1,
      isFeatured: 1,
      salesCount: 0,
    },
    {
      categoryId: 3,
      name: "3200 Cristais",
      slug: "black-clover-3200-cristais",
      description: "3200 Cristais para Black Clover Mobile. Entrega instantânea após confirmação do pagamento.",
      shortDescription: "3200 Cristais + Bônus",
      imageUrl: "/games/black-clover.jpg",
      price: 340000, // 3400 Kz
      originalPrice: 380000,
      bonus: "+320 Cristais Bônus",
      isActive: 1,
      isFeatured: 1,
      salesCount: 0,
    },
  ];

  console.log("🎮 Inserindo produtos...");
  await db.insert(products).values(productsData);
  console.log("✅ Produtos inseridos!");

  console.log("🎉 Seed concluído com sucesso!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("❌ Erro ao fazer seed:", error);
  process.exit(1);
});
