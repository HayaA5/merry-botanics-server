// module.exports=(req,res)=>{
//     res.send("bdcfj");
// };

const express = require("express");
const router=express.Router();

const usersRouter=require("./user.route");
const itemsRouter=require("./item.route");
// const itemsRouter=require("./itemRoute");
const ordersRouter=require("./order.route");
const emailRouter=require('./email.route')


router.use("/users",usersRouter); //in url nituv
router.use("/items",itemsRouter);
router.use("/orders",ordersRouter);
router.use("/email", emailRouter);

module.exports = router;
