var userModel = require("../models/user");

exports.getUsersByActive = async function getUsersByActive(active) {
    if (active == 'a') {
        return await userModel.find();
    } else {
        return await userModel.find({'active': active});
    }
}