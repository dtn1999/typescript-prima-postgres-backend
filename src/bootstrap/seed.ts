import { PrismaClient } from '@prisma/client';
import { add } from 'date-fns';

const prisma = new PrismaClient();

// A main function to be able to use async/await

async function main() {
  await prisma.testResult.deleteMany({});
  await prisma.courseEnrollment.deleteMany({});
  await prisma.test.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.course.deleteMany({});

  const random = String(Math.random() * 100);
  // eslint-disable-next-line no-unused-vars
  const user = await prisma.user.create({
    data: {
      email: `janne${random}doe@gmail.com`,
      firstName: 'joen',
      lastName: 'doe',
      social: {
        we: 'john',
        onDjoss: 'doe',
      },
    },
  });
  const weekFromNow = add(new Date(), { days: 7 });
  const twooWeekFromNow = add(new Date(), { days: 14 });
  const monthFromNow = add(new Date(), { days: 30 });

  const course = await prisma.course.create({
    data: {
      name: 'CRUD WITH PRISMA IN THE REAL WORLD',
      tests: {
        create: [
          {
            date: weekFromNow,
            name: 'First Test ',
          },
          {
            date: twooWeekFromNow,
            name: 'Secon Test From Now',
          },
          {
            date: monthFromNow,
            name: 'finale Exam',
          },
        ],
      },
      members: {
        create: {
          role: 'TEACHER',
          user: {
            connect: { email: user.email },
          },
        },
      },
      coursDetails: 'Formation to real world backend exemples',
    },
    include: {
      tests: true,
      members: {
        include: { user: true },
      },
    },
  });

  console.log(course);
}

export { main, prisma };
