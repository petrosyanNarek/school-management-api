import {addTeacher, updateTeacher, deleteTeacher, getTeachers} from '../services/teacherService.js';

const teacherController = {
    addTeacher: async (_, { firstName, lastName, email, password }) => {
        return addTeacher({ firstName, lastName, email, password });
    },
    updateTeacher: async (_, { id, firstName, lastName, email }) => {
        return updateTeacher({ id, firstName, lastName, email });
    },
    deleteTeacher: async (_, { id }) => {
        return deleteTeacher(id);
    },
    getTeachers: async () => getTeachers()
};

export default teacherController;
