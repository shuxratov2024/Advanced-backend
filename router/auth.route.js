const express = require('express');
const authController = require('../controller/auth.controller');
 const router = express.Router();

 router.post("/register", authController.register)
 router.get("/activation/:id", authController.activate)
 router.post("/login", authController.login)
 router.post("/logout", authController.logout)
 router.post("/refresh", authController.refresh)


 module.exports = router