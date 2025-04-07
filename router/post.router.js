 const express = require('express');
const postController = require('../controller/post.controller');
 const router = express.Router();

router.get('/get', postController.getAll)
router.post('/create', postController.create)
router.delete('/delete/:id', postController.delete)
router.put("/edit/:id", postController.edit)
router.get("/get-one/:id", postController.getOne)
module.exports = router;