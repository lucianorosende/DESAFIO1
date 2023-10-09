import { SessionData } from "express-session";

export const UserDTO = (reqSession: any) => {
    let filteredUser = {
        firstName: reqSession.user.firstName,
        lastName: reqSession.user.lastName,
        email: reqSession.user.email,
        age: reqSession.user.Age,
        isAdmin: reqSession.user.isAdmin,
        role: reqSession.user.role,
    };
    return filteredUser;
};
