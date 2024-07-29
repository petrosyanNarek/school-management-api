import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const seedStudent = async () => {
    const hashedPassword = await bcrypt.hash('studentpassword', 10);

    const studentUser = await prisma.user.upsert({
        where: { email: 'student@example.com' },
        update: {},
        create: {
            email: 'student@example.com',
            password: hashedPassword,
            firstName: 'Student',
            lastName: 'User',
            role: 'STUDENT',
        },
    });

    await prisma.student.create({
        data: {
            userId: studentUser.id,
        },
    });
};
