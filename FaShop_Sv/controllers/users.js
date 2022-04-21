const usersService = require('../services/users')
const bcrypt = require('bcryptjs');

exports.getListUsers = async function () {
    return await usersService.getListUsers();
}
exports.getUserById = async function getUserById(id) {
    return await usersService.getUserById(id);
}

exports.getUserByEmail = async function (email) {
    return await usersService.getUserByEmail(email);
}

exports.login = async function login(username, password) {
    const user = await usersService.login(username);
    if (!user) {
        return null;
    }
    const checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass) {
        return null;
    }
    return { id: user.id, username: user.username };
}
exports.addNewUser = async function addNewUser(email, password) {
    let hash_password = await bcrypt.hashSync(password, 10);
    let user = { email: email, password: hash_password };
    try {
        await usersService.addNewUser(user);
    } catch (err) {
        console.log(err);
    }
}
exports.delete = async function (id) {
    await usersService.remove(id);
}
exports.search = async function (keyword) {
    return await usersService.search(keyword);
};

exports.changePassword = async function (email, password) {
    let hash_password = await bcrypt.hashSync(password, 10);
    try {
        await usersService.changePassword(email, hash_password);
    } catch (err) {
        console.log(err);
    }
}
exports.updateProfile = async (user) => {
    return await usersService.updateProfile(user);
}

