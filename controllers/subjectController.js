import * as subjectService from '../services/subjectService.js';

const subjectController = {
    subjects: async () => {
        return await subjectService.getSubjects();
    },

    subject: async (parent, { id }) => {
        return await subjectService.getSubjectById(id);
    },

    addSubject: async (parent, { name, teacherId }) => {
        return await subjectService.createSubject({ name, teacherId });
    },

    updateSubject: async (parent, { id, name, teacherId }) => {
        return await subjectService.updateSubject(id, { name, teacherId });
    },

    deleteSubject: async (parent, { id }) => {
        return await subjectService.deleteSubject(id);
    },
};

export default subjectController;
