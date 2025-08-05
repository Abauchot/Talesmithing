import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Créer des utilisateurs de test
  const user1 = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      name: 'Alice',
      stories: {
        create: [
          {
            title: 'L\'aventure du dragon',
            content: 'Il était une fois un dragon qui vivait dans une montagne...',
            published: true,
          },
          {
            title: 'Le voyage mystérieux',
            content: 'Un jour, un explorateur découvrit une carte ancienne...',
            published: false,
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      email: 'bob@example.com',
      name: 'Bob',
      stories: {
        create: [
          {
            title: 'La forêt enchantée',
            content: 'Au cœur de la forêt se cachait un secret...',
            published: true,
          },
        ],
      },
    },
  });

  console.log({ user1, user2 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
