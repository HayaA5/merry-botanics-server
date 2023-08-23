const userModel = require("../Model/user.model");

async function create(data) {
   // console.log('create user model',data)
  return await userModel.create(data);
}
async function readOne(filter = {}, projection) {
  return await userModel.findOne({ ...filter, isActive: true }, projection);
}
async function readMany(filter = {}) {
  return await userModel.find({ ...filter, isActive: true });
}
async function update(email, data) {
  console.log("update in usercontroller")
  console.log(email)
  console.log(data)
  return await userModel.updateOne(email, data);
}
async function del(email) {
  return await userModel.updateOne({ email }, { isActive: false });
}

module.exports = { create, readOne, readMany, update, del };
