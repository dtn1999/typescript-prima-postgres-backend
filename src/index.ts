import { main, prisma } from '../src/bootstrap/seed';

main()
  .catch((error: any) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

console.log('================ SCRIPT ==================');
