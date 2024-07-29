import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const seedTeacher = async () => {
    const hashedPassword = await bcrypt.hash('teacherpassword', 10);

    const teacherUser = await prisma.user.upsert({
        where: { email: 'teacher@example.com' },
        update: {},
        create: {
            email: 'teacher@example.com',
            password: hashedPassword,
            firstName: 'Teacher',
            lastName: 'User',
            role: 'TEACHER',
        },
    });

    await prisma.teacher.create({
        data: {
            userId: teacherUser.id,
        },
    });
};
