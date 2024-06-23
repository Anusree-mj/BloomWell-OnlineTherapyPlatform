export let users = [];

export const userJoin = (socketId, userId) => {
    const user = users.find((user) => user.userId === userId);
    if (user) {
        return false;
    }
    users.push({ socketId, userId });
    console.log('users is stored like', users)
    return true;
};

export const userLeft = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
    console.log('users after userleft', users)
};

export const getUsers = () => users;
