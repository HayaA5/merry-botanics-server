const mongoose = require('mongoose');
const {SchemaTypes} = mongoose

const orderSchema = new mongoose.Schema({
    receiptNumber:{
        type:String,
        required:true,
        unique:true  
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    total: {
        type: Number,
        required: true
    },
    userId: {
        type: SchemaTypes.ObjectId,
        ref: 'user'
    },
    items: [{
        itemId: { type: SchemaTypes.ObjectId, ref: 'item' },
        qty: { type: Number, required: true, default: 1 }
    }],
})

const orderModel = mongoose.model('order', orderSchema);
module.exports =  orderModel 
