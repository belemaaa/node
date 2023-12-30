const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Order = require('../models/order')
const Product = require('../models/product')

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "all orders displayed "
    })
})
router.post('/create', async (req, res, next) => {
    const product_id = req.body.product_id
    const quantity = req.body.quantity
    try{
        const existing_product = Product.findById(product_id).exec()
        if (existing_product){
            const product_price = existing_product.price
            const calculated_price = product_price * quantity
            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                product: product_id,
                quantity: quantity,
                price: calculated_price
            })
            const saved_order = await order.save()
            const response = {
                order_id: order._id,
                product_id: order.product,
                quantity: order.quantity,
                price: order.price,
                request: {
                    type: 'GET',
                    description: 'GET_PRODUCT_DETAIL',
                    url: 'http://localhost:3000/products/' + product_id
                }
            }
            res.status(201).json({
                message: "New order created for product " + product_id,
                response
            })
        } else{
            res.status(404).json({
                message: "Invalid product id"
            })
        }
    }catch(error){
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
    
})

module.exports = router