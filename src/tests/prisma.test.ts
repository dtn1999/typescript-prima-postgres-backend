/* eslint-disable no-undef */
import { PrismaClient } from '@prisma/client';
import { TMeeting } from '../models/meeting';
import { TUser } from '../models/user';

describe('test prisma', () => {
  const prisma = new PrismaClient();
  //
  let userId: number;
  let meetingId:number;

  //
  const user:TUser = {
    email: `johndoe${Date.now().toString()}@gmail.com`,
    firstName: 'john',
    lastName: 'doe',
    social: {
      facebook: 'danyls',
      github: '@danyls',
      tiktok: '@tik_danyls',
    },
  };

  //
  const meeting:TMeeting = {
    theme: 'Introduction to Web Technology',
    title: 'Create a Backend solution',
    meetingDetails: 'The meeting is to talk about implemetation of web server with hapi and typescript',
  };
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('Create a user : succed', async () => {
    const createdUser = await prisma.user.create({
      data: {
        ...user,
      },
    });
    userId = createdUser.id;
    expect(createdUser).toBeTruthy();
  });

  test('Create a Meeting: work', async () => {
    const createMeeting = await prisma.meeting.create({
      data: {
        ...meeting,
        User: { connect: { id: userId } },
      },
    });
    console.log(createMeeting);
    meetingId = createMeeting.id;
    expect(createMeeting).toBeTruthy();
  });

  test('get a meeting: dont work', async () => {
    const dbMeeting = await prisma.meeting.findUnique({
      where: { id: -4 },
    });
    expect(dbMeeting).toBeFalsy();
  });

  test('get a meeting: work', async () => {
    console.log(meetingId);
    const dbMeeting = await prisma.meeting.findUnique({
      where: { id: meetingId },
    });
    expect(dbMeeting).toBeTruthy();
  });
});
