const mongoose = require('mongoose')

const order_schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        default: 1
    },
    price: {
        type: Number
    }
})

module.exports = mongoose.model('Order', order_schema)