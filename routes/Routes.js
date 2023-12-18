const AuthController = require("../controllers/AuthController.js")

const express = require('express')

const Route = express.Router()


//Public Route
Route.post('/Login', AuthController.Login)
Route.post('/Signup', AuthController.Signup)



module.exports = Route