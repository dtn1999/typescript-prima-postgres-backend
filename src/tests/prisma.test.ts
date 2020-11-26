/* eslint-disable no-undef */
import { PrismaClient } from '@prisma/client';

describe('test prisma', () => {
  const prisma = new PrismaClient();
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('test query', async () => {
    const data = await prisma.user.findMany({
      take: 18, select: { id: true },
    });
    expect(data).toBeTruthy();
  });
});
