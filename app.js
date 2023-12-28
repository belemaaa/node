const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const product_routes = require('./api/routes/products')
const order_routes = require('./api/routes/orders')

// connect mongodb database
const db = (module.exports = () => {
    try{
        mongoose.connect('mongodb+srv://graceitamunoala:'+process.env.MONGO_ATLAS_PW+'@node-proj.w2tuwms.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Database connected successfully')
        // const connection = mongoose.connection
        // connection.once("open", () => {
        //     console.log("Mongodb connected")
        // })
    } catch(error){
        console.log(error)
        console.log('Database connection failed')
    }
})
db();
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false})) 
app.use(bodyParser.json())

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
    }
    next()
})

app.use('/products', product_routes)
app.use('/orders', order_routes)

app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app