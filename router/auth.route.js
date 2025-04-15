const express = require('express');
const authController = require('../controller/auth.controller');
 const router = express.Router();

 router.post("/register", authController.register)
 router.get("/activation/:id", authController.activate)


 module.exports = router