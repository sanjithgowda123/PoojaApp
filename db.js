let users = [];

function getAllUsers() {
    return users;
}

function addUser(name, email) {
    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
    return newUser;
}

module.exports = {
    getAllUsers,
    addUser
};
