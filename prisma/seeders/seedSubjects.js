import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seedSubjects = async () => {
    const teacher = await prisma.teacher.findFirst();

    if (!teacher) {
        process.exit(1);
    }

    await prisma.subject.createMany({
        data: [
            { name: 'Math', teacherId: teacher.id },
            { name: 'Science', teacherId: teacher.id },
            { name: 'History', teacherId: teacher.id },
        ],
    });
};