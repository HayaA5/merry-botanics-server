const userController = require('../DL/Controller/user.controller')
const orderController = require('../DL/Controller/order.controller')
const itemController = require('../DL/Controller/item.controller')

//TO DO-->לפצל לכמה פונק, 1 לכל חלק!
async function createOrder(order) {//continue QA with postman
  //console.log('creat order service', order.email, order.receiptNumber," --", order.cart)
  if (! order.email || !order.receiptNumber || !order.cart) throw{ code:400, message:"missing data- order must contain user email, receipt number and cart"}
    const user = await userController.readOne({ email: order.email })
    console.log('qq')
    if(!user) throw {code:400, message:"this user doesn't exist"}
    const receiptExists=await orderController.readOne({receiptNumber:order.receiptNumber})
    console.log('ww ', receiptExists)
   if(receiptExists) {
    console.log('not null')
    throw {code:400, message:"this receipt number already exist and it should be unique"}
  }
  console.log("ff ", order.cart)
  console.log('oo ',JSON.stringify(order.cart));
 // const cartLength=JSON.parse(JSON.stringify(order.cart))
  const cart=JSON.parse(JSON.stringify(order.cart))
  console.log('ee ',cartLength)
  //console.log("plus ", a.length )
 // if(JSON.parse(order.cart).length==0){
 // if(order.cart=="[]"){
  if(cart.length==0){
    console.log("hic")
    throw{code:400, message:"empty cart- nothing has been done"}
  }
  console.log('aa')
    let total = 0;
    // לעבור על כל מוצר והאם מוצר קיים וגם יש לו מלאי 
    let itemsForOrder=[];
   // console.log('bb', order.cart, 'hh')
    for (i of cart) {//=JSON
      console.log("boucle ", i)
        const item = await itemController.readOne({ barcode: i.barcode })//i.item
    
        // אם המוצר קיים וגם המלאי גדול מהכמות הנדרשת - תמשיך 
        // אם לא שגיאה
        if (!item || item.stock < i.qty) {
             throw { code:400, message:"not found or not in stock- order cancelled"}
        }
        if(i.qty<0){ throw{code:400, message:"qty should be positive. Order cancelled"}}
        itemsForOrder=[...itemsForOrder,{itemID:item._id,qty:i.qty}]
        total += item.price * i.qty;
    }
console.log('bla')
    const newOrder=    await orderController.create({ total:total, userId:user._id,items: itemsForOrder,receiptNumber:order.receiptNumber})
      console.log('new order', newOrder)
    // לעדכן מלאי במידה ונשמר
       for (i of order.cart) {
        const item = await itemController.readOne({ barcode: i.barcode })
         const x= await itemController.update({ barcode: i.barcode },{stock:item.stock-i.qty})
       }
    return newOrder
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