import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUserFromToken = async (token) => {
    let user = null;
    if (token) {
        try {
            const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET, { ignoreExpiration: true });
            user = await prisma.user.findUnique({
                where: { id: decoded.userId },
            });
        } catch (err) {
            console.error('Token verification error:', err);
        }
    }
    return user;
};
