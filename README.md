# School Management Tool

## Overview
The School Management Tool is a comprehensive application for managing various school-related operations, including managing students, teachers, subjects, and their relationships. It features role-based dashboards and secure authentication.

## Prerequisites
- **Node.js**: v20.10.0
- **npm**: Comes with Node.js
- **MySQL**: For database management

## Installation

1. **Install dependencies**:
 ```bash
    npm install
 ```

2. **Create MySQL Database**:
 ```bash
    CREATE DATABASE schoolmanage;
 ```

3. **Set up environment variables**:
  3.1 ***Copy .env.example to .env***:
     ```bash
        cp .env.example .env
     ```
   3.2 ***Edit the .env file to add your database URL and JWT secret:***:

    DATABASE_URL="mysql://root@localhost:3306/schoolmanage"
    JWT_SECRET="your_jwt_secret"

5. **Run database migrations**:
 ```bash
    npx prisma migrate dev --name init
 ```
6. **Seed the database with default data**:
 ```bash
    npx prisma db seed
 ```

**Default Admin Login**
    Email: admin@example.com
    Password: adminpassword

**Running the Application**

 ```bash
    npm run dev
 ```