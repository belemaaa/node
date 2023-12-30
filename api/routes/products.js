const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const mongoose = require('mongoose')

const get_products = () => {
    router.get('/', (req, res, next) => {
        Product.find().select('_id name price').exec()
            .then(products => {
                res.status(200).json(products)
            }).catch(err => {
                console.log(err)
                res.status(500).json({
                    error_message: err
                })
            })  
    })
}
const create_product = () => {
    router.post('/create', (req, res, next) => {
        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price
        })
        product.save().then(result => {
            console.log(result)
            res.status(201).json({
                message: "request successful",
                created_product: product
            })
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({
                error: err
            })
        })
    })
}
const get_product_detail = () => {
    router.get('/:product_id', (req, res, next) => {
        const product_id = req.params.product_id
        Product.findById(product_id).select('_id name price').exec()
            .then(result => {
                console.log(result)
                if (result){
                    res.status(200).json(result)
                }else{
                    res.status(404).json({error: "not found"})
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    error: err
                })
            }) 
    }) 
}
const delete_product = () => {
    router.delete('/:product_id', (req, res, next) => {
        const product_id = req.params.product_id
        Product.deleteOne({_id: product_id}).exec().then(result => {
            console.log('Resource deleted')
            res.status(200).json({
                message: "Product has been deleted",})
        }).catch(err => console.log(err))
    })
}
const update_product = () => {
    router.patch('/:product_id', (req, res, next) => {
        const product_id = req.params.product_id
        const updateOps = {}
        for (const prop in req.body){
            updateOps[prop] = req.body[prop]
        }
        Product.updateOne({_id: product_id}, {$set: updateOps}).exec()
            .then(result => {
                console.log(result)
                res.status(200).json({
                    message: "product updated",
                    updated_product: {
                        "_id": product_id,
                        ...updateOps
                    }
                })
            }).catch(err => console.log(err))
    })
}

get_products()
create_product()
get_product_detail()
delete_product()
update_product()

module.exports = router