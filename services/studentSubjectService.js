import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getStudentSubjects = async () => {
    return await prisma.userSubject.findMany({
        include: {
            student: {
                include: {
                    user: true,
                },
            },
            subject: true,
        },
    });
};

export const addStudentSubject = async (input) => {
    const { studentId, subjectId, grade } = input;
    return await prisma.userSubject.create({
        data: {
            student: {
                connect: { id: studentId },
            },
            subject: {
                connect: { id: subjectId },
            },
            grade,
        },
        include: {
            student: true,
            subject: true,
        },
    });
};

export const updateStudentSubject = async (id, input) => {
    const { studentId, subjectId, grade } = input;
    return await prisma.userSubject.update({
        where: { id },
        data: {
            student: {
                connect: { id: studentId },
            },
            subject: {
                connect: { id: subjectId },
            },
            grade,
        },
        include: {
            student: true,
            subject: true,
        },
    });
};

export const deleteStudentSubject = async (id) => {
    await prisma.userSubject.delete({
        where: { id },
    });
    return true;
};
