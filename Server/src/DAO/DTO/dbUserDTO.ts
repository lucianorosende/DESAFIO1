export const dbUserDTO = (users: any) => {
    let newArr = users.map((user: any) => {
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            uid: user._id,
        };
    });

    return newArr;
};
