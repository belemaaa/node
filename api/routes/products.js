const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "handling GET requests "
    })
})

router.post('/create', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    }
    res.status(201).json({
        message: "request successful",
        created_product: product
    })
})

router.get('/:product_id', (req, res, next) => {
    const product_id = req.params.product_id
    if (product_id === '1'){
        res.status(200).json({
            message: `Detail returned for product ${product_id}`,
            id: product_id
        })
    }else{
        res.status(400).json({
            error: "bad request"
        })
    }
}) 

module.exports = router