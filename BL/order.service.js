

const userController = require('../DL/Controller/user.controller')
const orderController = require('../DL/Controller/order.controller')
const itemController = require('../DL/Controller/item.controller')

async function createOrder(order) {
    console.log('create order service')
    let res = {}
//console.log(order);
//console.log('order service create ');
//checks if the user already exists
// const user = await userController.read({email:order.user})[0]
console.log('order',order)
    const user = await userController.readOne({ email: order.email })
    console.log('user', user);
    //if (!user) { console.log('Error- user not found'); return false; }
    if(!user) throw {code:400, message:"this user doesn't exist"}
  //  console.log('order service user exisst')
    //console.log('----',order.receiptNumber)
    //checks if the receipt number already exists (it should be unique)==>change to generate unique number
    const xx=await orderController.readOne({receiptNumber:order.receiptNumber})
   console.log('----------', xx)
   if(xx) {
    console.log('error')
    throw {code:400, message:"this receipt number already exist and should be unique"}}//pb when we do throw...
   // if (xx) throw {code:400, message:"this receipt number already exists"}
    //console.log('order service number receipt')
    //console.log('id mongo', user._id);
    let total = 0;
    // לעבור על כל מוצר והאם מוצר קיים וגם יש לו מלאי 
    let itemsForOrder=[];
//     console.log('order.cart',order.cart)
    for (i of order.cart) {
        const item = await itemController.readOne({ barcode: i.barcode })//i.item
        
        // אם המוצר קיים וגם המלאי גדול מהכמות הנדרשת - תמשיך 
        // אם לא שגיאה
        if (!item || item.stock < i.qty) {
            console.log("not found or not in stock"); throw { code:400, message:"not found or not in stock- order cancelled"}
        }
        if(i.qty<0){ throw{code:400, message:"qty should be positive. Order has been cancelled"}}
        itemsForOrder=[...itemsForOrder,{itemID:item._id,qty:i.qty}]
        console.log('item',item)
        total += item.price * i.qty;
    }
console.log('total',total)
console.log('itemsfororder array',itemsForOrder)
        // שמירת הזמנה
//invente receiptNumber-unique

    const newOrder=    await orderController.create({ total:total, userId:user._id,items: itemsForOrder,receiptNumber:order.receiptNumber})
        // לעדכן מלאי במידה ונשמר

    //     for (i of order.cart) {
    //         //we need next row only if we use _id and not barcode
    //        // const item = await itemController.readOne({ barcode: i.barcode })
    //        // const item2=await itemController.readOne({_id:itemsForOrder.itemID})
    //         console.log('rest',item.stock-i.qty)
    //         const x= await itemController.update({barcode:i.barcode}, {stock:item.stock-i.qty})
    //        // itemsForOrder=[...itemsForOrder,{itemID:item._id,qty:i.qty}]
    // //console.log('item',item)
    //         // אם המוצר קיים וגם המלאי גדול מהכמות הנדרשת - תמשיך 
    //         // אם לא שגיאה
    //         // if (!item || item.stock < i.qty) {
    //         //     console.log("not found or not in stock"); return false
    //         // }
    //         // total += item.price * i.qty;
    //     }




    // console.log(res);
    //return res
    return newOrder
}

async function getOrdersByUser(data){
    console.log(data)
    const user = await userController.readOne({ email:data.email});
    if(!user) throw {code:400, message:"this user doesn't exist"}

    const orders= await orderController.read({userId:user._id});
    console.log('user by order',orders)
    return orders;
}
async function getOrderById(receiptNumber){
    const order = await orderController.readOne({ receiptNumber })
    if (!order) throw{code:400, message:"there is no receipt with this number"}
    return order;
}

async function getAllOrders(){
  let orders=  orderController.read();
  console.log(orders);
  return orders
}

// const orderFromClient = {
//     receiptNumber:333,
//     email: "aminovhaya2@gmail.com",
//    // total:20,
//    // userId:SchemaTypes.ObjectId('64a246fc708d06ffd96e608d'),
//     cart: [{ barcode:'',qty:3}]
// }

//  createOrder(orderFromClient);

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