const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Order = require('../models/order')
const Product = require('../models/product')

const get_orders = () => {
    router.get('/', (req, res, next) => {
        Order.find().select('_id product quantity price').exec()
            .then(orders => {
                res.status(200).json(orders)
            }).catch(err => {
                console.log(err)
                res.status(500).json({
                    error: err
                })
            })
    })
}

const create_order = () => {
    router.post('/create', async (req, res, next) => {
        const product_id = req.body.product_id
        const quantity = req.body.quantity || 1
        try{
            const existing_product = await Product.findById(product_id).exec()
            if (existing_product){
                const product_price = parseFloat(existing_product.price)
                const calculated_price = parseFloat(product_price * quantity)
                console.log(product_price, calculated_price)
                const order = new Order({
                    _id: new mongoose.Types.ObjectId(),
                    product: product_id,
                    quantity: quantity,
                    price: calculated_price
                })
                const saved_order = await order.save()
                const response = {
                    order_id: saved_order._id,
                    product_id: saved_order.product,
                    quantity: saved_order.quantity,
                    price: saved_order.price,
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
            }else{
                res.status(404).json({
                    message: "Invalid product id"
                })
            }
        }catch(error){
            console.log(error)
            res.status(500).json({
                error: error,
            })
        }
        
    })
    
}

get_orders()
create_order()

module.exports = router