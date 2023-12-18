import AuthController from "../controllers/AuthController.js";

import express from "express"

const Route = express.Router()


//Public Route
Route.post('/Login', AuthController.Login)
Route.post('/Signup', AuthController.Signup)



export default Route