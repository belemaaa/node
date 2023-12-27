const express = require('express')
const router = express.Router()
const db = require('./demo_db.json')

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "all orders displayed "
    })
})
router.post('/create/:product_id', (req, res, next) => {
    const product_id = req.params.product_id
    if (product_id === db.id){
        const product = {
            id: db.id,
            name: db.name,
            price: db.price
        }
        res.status(201).json({
            message: `New order created for product ${product_id}`,
            product_details: product
        })
    } else{
        res.status(404).json({
            message: `Product id ${product_id} not found`
        })
    }
})

module.exports = router