import { PrismaClient } from '@prisma/client';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const getUsers = async () => {
    return await prisma.user.findMany();
};

const registerUser = async ({ email, password, firstName, lastName, role }) => {
    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (existingUser) {
        throw new Error('This email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            firstName,
            lastName,
            role,
        },
    });
};

const updateUser = async ({ id, firstName, lastName, email }) => {
    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (existingUser) {
        throw new Error('This email already exists');
    }

    return await prisma.user.update({
        where: { id },
        data: { firstName, lastName, email },
    });
}

const getUserByToken = async (context) => {
    try {
        return await prisma.user.findUnique({
            where: { id: context.user.id },
            include: {
                Teacher: true,
                Student: true,
            },
        });
    } catch (err) {
        throw new Error('Invalid token');
    }
}

const loginUser = async ({email , password}) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new Error('User not found');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        throw new Error('Invalid password');
    }

    return jwt.sign({userId: user.id}, process.env.JWT_SECRET);
}

export { getUsers, getUserByToken, loginUser, registerUser, updateUser };