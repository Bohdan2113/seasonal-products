import { DataSource } from 'typeorm';
import { Category } from './entities/category_entity';
import { Item } from './entities/item_entity';
import { Label } from './entities/label_entity';
import 'dotenv/config';

const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: true,
  entities: [Category, Item, Label],
});

async function seed() {
  await dataSource.initialize();

  const labelNames = ['seasonal', 'top 100'];
  const labels = labelNames.map(name => dataSource.manager.create(Label, { name }));
  await dataSource.manager.save(labels);

  const mainCategories: Category[] = [];
  const subCategories: Category[] = [];

  for (let i = 1; i <= 2; i++) {
    const main = dataSource.manager.create(Category, {
      name: `Category ${i}`,
    });
    await dataSource.manager.save(main);
    mainCategories.push(main);

    for (let j = 1; j <= 3; j++) {
      const sub = dataSource.manager.create(Category, {
        name: `SubCategory ${i}.${j}`,
        parent: main,
      });
      await dataSource.manager.save(sub);
      subCategories.push(sub);
    }
  }

  const items: Item[] = [];

  for (let i = 1; i <= 150; i++) {
    const randomSubCategory = subCategories[Math.floor(Math.random() * subCategories.length)];
    const randomLabels = labels.sort(() => 0.5 - Math.random()).slice(0, 2);

    const item = dataSource.manager.create(Item, {
      name: {
        en: `Product ${i}`,
        ua: `Товар ${i}`,
        ar: `منتج ${i}`,
      },
      description: `Description for product ${i}`,
      images: [`imagepath/product-${i}.jpg`],
      price: Math.floor(Math.random() * 2000),
      category: randomSubCategory,
      labels: randomLabels,
    });

    items.push(item);
  }

  await dataSource.manager.save(items);

  console.log('✅ Seed completed with categories, labels and items!');
  process.exit();
}

seed().catch((err) => {
  console.error('❌ Seed error:', err);
  process.exit(1);
});
