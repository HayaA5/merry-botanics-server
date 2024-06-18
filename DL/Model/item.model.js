const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    cover: {//=image
        type: String,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    barcode: {
        type: String,
        required: true,
        unique: true
    },
    light: {
        type: Number,
        enum: [1, 2, 3],
        required: true
    },
    water: {
        type: Number,
        enum: [1, 2, 3],
        required: true
    },
    category: {
        type: String,
        enum: ['classic', 'outdoor', 'perennial plant'],
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    description: {
        type: String
        // default: ''
    }
})

const itemModel = mongoose.model("item", itemSchema)

module.exports = itemModel