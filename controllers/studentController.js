import {addStudent, updateStudent, deleteStudent, getStudents} from '../services/studentService.js';

const studentController = {
    addStudent: async (_, { firstName, lastName, email, password, grade }) => {
        return addStudent({ firstName, lastName, email, password, grade });
    },
    updateStudent: async (_, { id, firstName, lastName, email, grade }) => {
        return updateStudent({ id, firstName, lastName, email, grade });
    },
    deleteStudent: async (_, { id }) => {
        return deleteStudent(id);
    },
    getStudents: async () => getStudents()
};

export default studentController;
