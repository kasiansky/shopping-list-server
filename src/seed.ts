import { createConnection } from 'typeorm';
import { Category } from '../src/modules/categories/category.entity';

const seedData = [
  { name: "ירקות ופירות" },
  { name: "מוצרי נקיון" },
  { name: "מאפים" },
  { name: "בשר ודגים" },
 
  // Add more seed data as needed
];

export async function seed() {
  const connection = await createConnection();

  try {
    const categoryRepository = connection.getRepository(Category);

    // Check if data already exists
    const existingCategories = await categoryRepository.find();

    if (existingCategories.length > 0) {
      console.log('Categories already seeded. Skipping seeding process.');
      return;
    }

    // Seed data if no existing data is found
    for (const data of seedData) {
      const category = categoryRepository.create(data);
      await categoryRepository.save(category);
    }

    console.log('Data seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await connection.close();
  }
}

