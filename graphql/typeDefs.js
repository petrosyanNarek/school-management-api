import { gql } from 'apollo-server-express';

const typeDefs = gql`
  enum Role {
    ADMIN
    TEACHER
    STUDENT
  }

  directive @admin on FIELD_DEFINITION

  type User {
    id: Int!
    email: String!
    firstName: String!
    lastName: String!
    Teacher: Teacher
    Student: Student
    role: Role!
  }

  type Teacher {
    id: Int!
    subjects: [Subject!]!
  }
  
  type TeacherUser {
    user: User
    id: Int!
    subjects: [Subject!]!
  }  
  
  type Student {
    id: Int!
    subjects: [Subject!]!
  }

  type StudentUser {
    user: User
    id: Int!
  }
  
  type Subject {
    id: Int!
    name: String!
    teacher: TeacherUser!
    students: [Student!]!
  }
  
  type StudentSubject {
    id: Int!
    student: StudentUser!
    subject: Subject!
    grade: Int!
  }
  
  input StudentSubjectInput {
    studentId: Int!
    subjectId: Int!
    grade: Int!
  }

  type Query {
    getUserByToken: User @admin
    users: [User!]! @admin
    teachers: [TeacherUser!]! @admin
    students: [StudentUser!]! @admin
    subjects: [Subject!]! @admin
    subject(id: Int!): Subject @admin
    studentSubjects: [StudentSubject!]! @admin
  }

  type Mutation {
    loginUser(email: String!, password: String!): String! 
    addTeacher(firstName: String!, lastName: String!, email: String!, password: String!): TeacherUser! @admin
    updateTeacher(id: Int!, firstName: String, lastName: String, email: String): TeacherUser! @admin
    deleteTeacher(id: Int!): Boolean! @admin
    addStudent(firstName: String!, lastName: String!, email: String!, password: String!): StudentUser! @admin
    updateStudent(id: Int!, firstName: String, lastName: String, email: String ): StudentUser! @admin
    deleteStudent(id: Int!): Boolean! @admin
    addSubject(name: String!, teacherId: Int!): Subject! @admin
    updateSubject(id: Int!, name: String, teacherId: Int): Subject! @admin
    deleteSubject(id: Int!): Boolean! @admin
    addStudentSubject(input: StudentSubjectInput!): StudentSubject @admin
    updateStudentSubject(id: Int!, input: StudentSubjectInput!): StudentSubject @admin
    deleteStudentSubject(id: Int!): Boolean @admin
  }
`;

export default typeDefs;
