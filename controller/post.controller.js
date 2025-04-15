
const fileService = require('../service/file.service');
const postService = require('../service/post.service')

const fileUpload = require('express-fileupload')

class PostController{
    async getAll(req,res) {
        try {
            console.log(req.requestTime);
            const allPosts = await postService.getAll(); // post parametri olib tashlandi
            res.status(200).json(allPosts);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    async create(req,res) {
        try {
            const picture = await uploadFile(req.file); // <-- await bilan kutib oling
            const newPost = new Post({ picture });
            await newPost.save();
            res.status(201).json(newPost);
          } catch (error) {
            res.status(400).json({ error: error.message });
          }
}
    async delete(req,res) {
        try{
            const post = await postService.delete(req.params.id)
            res.status(200).json(post)
            
        } catch (error){
            res.status(500).json(error)
        }
    }
    async edit (req,res) {
        try {
            const {body, params} = req
            const post = await postService.edit(params.id, body)
            res.status(200).json(post)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async getOne (req,res) {
        try {
            const {id} = req.params
            const post = await postService.getOne(id)
            res.status(200).json(post)
        } catch (error) {
            res.status(500).json(error)
        }
    }

}

module.exports = new PostController()