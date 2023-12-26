const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "handling GET requests "
    })
})

router.post('/create', (req, res, next) => {
    res.status(200).json({
        message: "request successful"
    })
})

router.get('/:product_id', (req, res, next) => {
    const product_id = req.params.product_id
    if (product_id === 1){
        res.status(200).json({
            message: `Detail returned for product ${product_id}`
        })
    }
})

module.exports = router