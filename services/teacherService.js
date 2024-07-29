import { PrismaClient } from '@prisma/client';
import { registerUser } from './userService.js';

const prisma = new PrismaClient();

const addTeacher = async ({ firstName, lastName, email, password }) => {
    const user = await registerUser({ email, password, firstName, lastName, role: 'TEACHER' });
    return prisma.teacher.create({
        data: {
            userId: user.id,
        },
        include: {
            user: true,
        },
    });
};

const updateTeacher = async ({ id, firstName, lastName, email }) => {
    const teacher = await prisma.teacher.findUnique({ where: { id } });
    if (!teacher) throw new Error('Teacher not found');
    const updatedUser = await prisma.user.update({
        where: { id: teacher.userId },
        data: { firstName, lastName, email },
    });
    return prisma.teacher.update({
        where: { id },
        data: {
            userId: updatedUser.id,
        },
        include: {
            user: true,
        },
    });
};

const deleteTeacher = async (id) => {
    const teacher = await prisma.teacher.findUnique({ where: { id } });
    if (!teacher) throw new Error('Teacher not found');
    await prisma.user.delete({ where: { id: teacher.userId } });
    return true;
};

const getTeachers = async async => {
    return await prisma.teacher.findMany({
        include: {
            user: true,
        },
    })
}

export { addTeacher, updateTeacher, deleteTeacher, getTeachers };
