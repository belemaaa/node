const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const signup = () => {
    router.post('/signup', (req, res, next) => {
        User.find({email: req.body.email}).exec().then(user => {
            if(user){
                return res.status(400).json({
                    message: "Bad request",
                    error: "User with this email already exists"
                })
            } else{
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err){
                        return res.status(500).json({
                            error: err
                        })
                    }else{
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        })
                        user.save().then(result => {
                            console.log(result)
                            res.status(201).json({
                                message: 'New user created',
                            })
                        }).catch(err => {
                            console.log(err)
                            res.status(500).json({
                                error: err
                            })
                        })
                    }
                })
            }
        })   
    })
}

signup()

module.exports = router
