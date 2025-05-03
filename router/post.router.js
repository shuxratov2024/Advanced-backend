 const express = require('express');
const postController = require('../controller/post.controller');
const logger = require('../middlewares/logger');
const authMiddleware = require('../middlewares/auth.middleware');
 const router = express.Router();

router.get('/get', postController.getAll)
router.post('/create', authMiddleware,postController.create)
router.delete('/delete/:id',authMiddleware, postController.delete)
router.put("/edit/:id",authMiddleware, postController.edit)
router.get("/get-one/:id",authMiddleware, postController.getOne)


module.exports = router