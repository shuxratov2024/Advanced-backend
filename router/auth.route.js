const express = require('express');
const authController = require('../controller/auth.controller');

const {body} = require("express-validator");
const authMiddleware = require('../middlewares/auth.middleware');

 const router = express.Router();

 router.post("/register",body("email").isEmail() ,body("password").isLength({min: 3, max:20}), authController.register)
 router.get("/activation/:id", authController.activate)
 router.post("/login",body("email").isEmail() ,body("password").isLength({min: 3, max:20}), authController.login)
 router.post("/logout", authController.logout)
 router.get("/refresh", authController.refresh)
 router.get("/get-users", authMiddleware,authController.getUsers)

 module.exports = router