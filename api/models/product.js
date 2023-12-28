const mongoose = require('mongoose')

const product_schema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    price: Number
})

module.exports = mongoose.model('Product', product_schema)