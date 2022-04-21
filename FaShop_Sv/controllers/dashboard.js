var dashboardServices = require("../services/dashboard");

exports.getUsersByActive = async function getUsersByActive(active) {
    return await dashboardServices.getUsersByActive(active);
}