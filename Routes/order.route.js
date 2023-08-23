const express = require ('express')
const router = express.Router()

const orderServices = require ('../BL/order.service')

router.get ("/user", async (req,res)=>{
    try{
        console.log(req.body.email)
        const order = await orderServices.getOrdersByUser(req.body)
        res.send(order)
    }
    catch (err){
        res.status(400).send(err)
    }
})

router.get ("/:receiptNumber", async (req,res)=>{
    try{
        const order = await orderServices.getOrderById(req.params.receiptNumber)
        res.send(order)
    }
    catch (err){
        res.status(400).send(err)
    }
})

router.get ("/", async (req,res)=>{//get all orders
    try{
        const order = await orderServices.getAllOrders()
        res.send(order)
    }
    catch (err){
        res.status(400).send(err)
    }
})

router.post('/addorder',async (req,res)=>{
    try{
        console.log('add order route')
        const order = await orderServices.createOrder(req.body)
        console.log("blabla")
        res.status(200).send(order)
    }
    catch(err){
        console.log('err',err)
        res.status(999).send(err)
    }
})

// router.put('/:receiptNumber',async (req,res)=>{
//     try{
//         const order = await orderServices.updateOrder(req.params.receiptNumber
//             ,req.body)
//         res.status(200).send(order)
//     }
//     catch(err){
//         res.status(999).send(err)
//     }
// })
module.exports = router
