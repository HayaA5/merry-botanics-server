const orderModel=require("../Model/order.model")

async function create(data) {
    return await orderModel.create(data);
}
async function read(filter, proj) {
    return await orderModel.find(filter, proj);
}

async function readOne(filter, proj) {
    return await orderModel.findOne(filter, proj);
}
async function update(filter, newData) {
    return await orderModel.findOneAndUpdate(filter, newData, { new: true });
}
async function del(filter) {
    return await update(filter, { isActive: false })
}

module.exports = { create, read, readOne, update, del }
