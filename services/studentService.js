import { PrismaClient } from '@prisma/client';
import {registerUser} from "./userService.js";

const prisma = new PrismaClient();

const addStudent = async ({ firstName, lastName, email, password, grade }) => {
    const user = await registerUser({ email, password, firstName, lastName, role: 'STUDENT' });
    return prisma.student.create({
        data: {
            userId: user.id,
            grade,
        },
        include: {
            user: true,
        },
    });
};

const updateStudent = async ({ id, firstName, lastName, email, grade }) => {
    const student = await prisma.student.findUnique({ where: { id } });
    if (!student) throw new Error('Student not found');
    const updatedUser = await prisma.user.update({
        where: { id: student.userId },
        data: { firstName, lastName, email },
    });
    return prisma.student.update({
        where: { id },
        data: {
            userId: updatedUser.id,
            grade,
        },
        include: {
            user: true,
        },
    });
};

const deleteStudent = async (id) => {
    const student = await prisma.student.findUnique({ where: { id } });
    if (!student) throw new Error('Student not found');
    await prisma.student.delete({ where: { id } });
    await prisma.user.delete({ where: { id: student.userId } });
    return true;
};

const getStudents = async async => {
    return await prisma.student.findMany({
        include: {
            user: true,
        },
    })
}

export { addStudent, updateStudent, deleteStudent, getStudents };
