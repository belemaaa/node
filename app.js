const express = require('express')
const app = express()

const product_routes = require('./api/routes/products')

app.use('/products', product_routes)

module.exports = app