const userController = require('../DL/Controller/user.controller')
const orderController = require('../DL/Controller/order.controller')
const itemController = require('../DL/Controller/item.controller')

async function createOrder(order) {
  //await inputValidation(order)
  if (! order.email || !order.receiptNumber || !order.cart) throw{ code:400, message:"missing data- order must contain user email, receipt number and cart"}
  const user = await userController.readOne({ email: order.email })
  if(!user) throw {code:400, message:"this user doesn't exist"}
  const receiptExists=await orderController.readOne({receiptNumber:order.receiptNumber})
 if(receiptExists) {
  throw {code:400, message:"this receipt number already exist and it should be unique"}
}
const cart=JSON.parse(JSON.stringify(order.cart))
if(cart.length==0){
  throw{code:400, message:"empty cart- nothing has been done"}
}
  // We go over each item and check if it exists and if it is in stock.
    let total = 0;
    let itemsForOrder=[];
    for (i of cart) {
        const item = await itemController.readOne({ barcode: i.barcode })//i.item
        if (!item || item.stock < i.qty) {
             throw { code:400, message:"one of the items in cart has not been found or is not in stock. Order cancelled"}
        }
        if(i.qty<0){ throw{code:400, message:"qty should be positive. Order cancelled"}}
        itemsForOrder=[...itemsForOrder,{itemID:item._id,qty:i.qty}]
        total += item.price * i.qty;
    }
//creates a new order and savec it in DB
    const newOrder=    await orderController.create({ total:total, userId:user._id,items: itemsForOrder,receiptNumber:order.receiptNumber})

    //update stocks of each item that has been bought.
       for (i of order.cart) {
        const item = await itemController.readOne({ barcode: i.barcode })
         const x= await itemController.update({ barcode: i.barcode },{stock:item.stock-i.qty})
       }
    return newOrder
}
//checks that all fields exist and contain a correct value
async function inputValidation(order){
  if (! order.email || !order.receiptNumber || !order.cart) throw{ code:400, message:"missing data- order must contain user email, receipt number and cart"}
  const user = await userController.readOne({ email: order.email })
  if(!user) throw {code:400, message:"this user doesn't exist"}
  const receiptExists=await orderController.readOne({receiptNumber:order.receiptNumber})
 if(receiptExists) {
  throw {code:400, message:"this receipt number already exist and it should be unique"}
}
const cart=JSON.parse(JSON.stringify(order.cart))
if(cart.length==0){
  throw{code:400, message:"empty cart- nothing has been done"}
}
}

async function getOrdersByUser(data){
    const user = await userController.readOne({ email:data.email});
    if(!user) throw {code:400, message:"this user doesn't exist"}
    const orders= await orderController.read({userId:user._id});
    return orders;
}
async function getOrderById(receiptNumber){
    const order = await orderController.readOne({ receiptNumber })
    if (!order) throw{code:400, message:"there is no receipt with this number"}
    return order;
}

async function getAllOrders(){
  return await orderController.read();
}

//body in postman!
//{
//     "email":"aminovhaya@gmail.com",
//     "receiptNumber":15,
//     "cart":[
//         {
//             "barcode":"7ie",
//             "qty":-1
//         }
//     ]
// }
module.exports = {getAllOrders,createOrder, getOrdersByUser, getOrderById}