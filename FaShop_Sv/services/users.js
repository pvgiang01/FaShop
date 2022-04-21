const userModel = require('../models/user')
exports.getListUsers = async function () {
  return await userModel.find();
}
exports.getUserById = async function (_id) {
  const user = await userModel.findById(_id);
  return user;
}
exports.getUserByEmail = async function (email) {
  return await userModel.findOne({ email: email });
}
exports.login = async function (username) {
  const user = await userModel.findOne({ username: username }, 'id username password');
  return user;
}
exports.addNewUser = async function (user) {
  let u = new userModel({
    email: user.email,
    password: user.password,
  });
  u.save(() => {
    console.log("Create account success!");
  })
    .catch((error) => {
      console.log("Fail, because: " + error);
    })
};
exports.updateProfile = async (user) => {
  let u = await this.getUserByEmail(user.email);
  u.name = user.name;
  u.email = user.email;
  u.phone = user.phone;
  u.address = user.address;
  if (user.image) {
    u.image = user.image;
  }
  return await u.save();
}
exports.remove = async function (_id) {
  await userModel.remove({ _id: _id });
}
exports.setActive = async function setActive(email, status) {
  await userModel.findOneAndUpdate({ email: email }, { active: status });
}
exports.search = async function (keyword) {
  let temp = await userModel.find();
  if (keyword == "false") {
    return temp;
  }
  return await temp.filter((s) =>
    s.name.toLowerCase().includes(keyword.toLowerCase())
  );
};

exports.changePassword = async (email, new_password) => {
  await userModel.findOneAndUpdate({ email: email }, { password: new_password });
}
