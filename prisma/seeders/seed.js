import { PrismaClient } from '@prisma/client';
import { seedAdmin } from './seedAdmin.js';
import { seedTeacher } from './seedTeacher.js';
import { seedStudent } from './seedStudent.js';
import {seedSubjects} from "./seedSubjects.js";

const prisma = new PrismaClient();

const mainSeeder = async () => {
    try {
        await seedAdmin();
        await seedTeacher();
        await seedStudent();
        await seedSubjects();
    } catch (error) {
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

await mainSeeder();
