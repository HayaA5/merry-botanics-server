const userModel = require("../Model/user.model");

async function create(data) {
  return await userModel.create(data);
}
async function readOne(filter = {}, projection) {
  return await userModel.findOne({ ...filter, isActive: true }, projection);
}
async function readMany(filter = {}) {
  return await userModel.find({ ...filter, isActive: true });
}
async function update(email, data) {
  return await userModel.updateOne(email, data);
}
async function del(email) {
  return await userModel.updateOne({ email }, { isActive: false });
}

module.exports = { create, readOne, readMany, update, del };
