import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getSubjects = async () => {
    return await prisma.subject.findMany({
        include: {
            teacher: {
                include: {
                    user: true
                }
            },
        },
    });
};

export const getSubjectById = async (id) => {
    return await prisma.subject.findUnique({
        where: { id },
        include: {
            teacher: true,
            students: true,
        },
    });
};

export const createSubject = async ({ name, teacherId }) => {
    return await prisma.subject.create({
        data: {
            name,
            teacher: {
                connect: { id: teacherId },
            },
        },
    });
};

export const updateSubject = async (id, { name, teacherId }) => {
    return await prisma.subject.update({
        where: { id },
        data: {
            name,
            teacher: teacherId ? {
                connect: { id: teacherId },
            } : undefined,
        },
    });
};

export const deleteSubject = async (id) => {
    await prisma.subject.delete({
        where: { id },
    });
    return true;
};
