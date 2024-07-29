import {getUserByToken, getUsers, loginUser} from "../services/userService.js";

const userController = {
    login: async (_, { email, password }) => {
        return loginUser({ email, password });
    },
    getUserByToken: async (parent, args, context) => {
        return getUserByToken(context);
    },
    users: async () => {
        return getUsers()
    }
};

export default userController;
