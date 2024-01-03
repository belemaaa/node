const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const user_routes = require('./api/routes/users')
const product_routes = require('./api/routes/products')
const order_routes = require('./api/routes/orders')

// connect to mongodb 
const database = () => {
    try{
        mongoose.connect('mongodb://127.0.0.1:27017/MONGO', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Database connected successfully')
    } catch(error){
        console.log(error)
        console.log('Database connection failed')
    }
}

const middlewares = () => {
    app.use(morgan('dev'))
    app.use(bodyParser.urlencoded({extended: false})) 
    app.use(bodyParser.json())
}

const headers = () => {
    app.use((req, res, next) => {
        // allow cors for all ports/servers
        res.header('Access-Control-Allow-Origin', '*') 
        res.header(
            'Access-Control-Allow-Headers', 
            'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        )
        if (req.method === 'OPTIONS'){
            res.headersSent('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET, PATCH')
            return res.status(200).json({})
        }next()
    })
}

const routes = ()=> {
    app.use('/user', user_routes)
    app.use('/products', product_routes)
    app.use('/orders', order_routes)
}

database()
middlewares()
headers()
routes()

module.exports = app