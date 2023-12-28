const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const mongoose = require('mongoose')

router.get('/', (req, res, next) => {
    Product.find().exec()
        .then(products => {
            res.status(200).json(products)
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })  
})
router.post('/create', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product.save().then(result => {
        console.log(result)
    })
    .catch(err => console.log(err))
    res.status(201).json({
        message: "request successful",
        created_product: product
    })
})
router.get('/:product_id', (req, res, next) => {
    const product_id = req.params.product_id
    Product.findById(product_id).exec()
        .then(result => {
            console.log(result)
            res.status(500).json(result)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({
                error: "not found"
            })
        })
    
}) 

module.exports = router