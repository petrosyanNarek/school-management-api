import userController from "../controllers/userController.js";
import teacherController from "../controllers/teacherController.js";
import studentController from "../controllers/studentController.js";
import subjectController from "../controllers/subjectController.js";
import studentSubjectController from "../controllers/studentSubjectController.js";

const resolvers = {
    Query: {
        getUserByToken: userController.getUserByToken,
        users: userController.users,
        teachers: teacherController.getTeachers,
        students: studentController.getStudents,
        subjects: subjectController.subjects,
        subject: subjectController.subject,
        studentSubjects: studentSubjectController.getStudentSubjects,
    },
    Mutation: {
        addTeacher: teacherController.addTeacher,
        updateTeacher: teacherController.updateTeacher,
        deleteTeacher: teacherController.deleteTeacher,
        addStudent: studentController.addStudent,
        updateStudent: studentController.updateStudent,
        deleteStudent: studentController.deleteStudent,
        addSubject: subjectController.addSubject,
        updateSubject: subjectController.updateSubject,
        deleteSubject: subjectController.deleteSubject,
        loginUser: userController.login,
        addStudentSubject: studentSubjectController.addStudentSubject,
        updateStudentSubject: studentSubjectController.updateStudentSubject,
        deleteStudentSubject: studentSubjectController.deleteStudentSubject,
    },
};

export default resolvers;
