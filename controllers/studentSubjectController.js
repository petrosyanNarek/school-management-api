import * as studentSubjectService from '../services/studentSubjectService.js';

const studentSubjectController = {
    getStudentSubjects: async () => {
        try {
            return await studentSubjectService.getStudentSubjects();
        } catch (error) {
            throw new Error("Unable to fetch student subjects");
        }
    },

    addStudentSubject: async (parent, { input }) => {
        try {
            if (!input || !input.studentId || !input.subjectId || input.grade === undefined) {
                throw new Error("Invalid input");
            }
            return await studentSubjectService.addStudentSubject(input);
        } catch (error) {
            throw new Error("Unable to add student subject");
        }
    },

    updateStudentSubject: async (parent, { id, input }) => {
        try {
            if (!input || input.grade === undefined) {
                throw new Error("Invalid input");
            }
            return await studentSubjectService.updateStudentSubject(id, input);
        } catch (error) {
            throw new Error("Unable to update student subject");
        }
    },

    deleteStudentSubject: async (parent, { id }) => {
        try {
            return await studentSubjectService.deleteStudentSubject(id);
        } catch (error) {
            throw new Error("Unable to delete student subject");
        }
    },
};

export default studentSubjectController;
