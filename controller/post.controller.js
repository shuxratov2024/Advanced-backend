
const { post } = require('../router/post.router');
const fileService = require('../service/file.service');
const postService = require('../service/post.service')

const fileUpload = require('express-fileupload')

class PostController{
    async getAll(req,res,next) {
        try {
            console.log(req.requestTime);
            const allPosts = await postService.getAll(); // post parametri olib tashlandi
            res.status(200).json(allPosts);
        } catch (error) {
            next(error)
        }
    }
async create (req, res, next) {
  try {
    if (!req.files?.picture) {
      return res.status(400).json({ error: "File 'picture' is required" });
    }

    const post = await postService.create(req.body, req.files.picture);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
}
    async delete(req,res,next) {
        try{
            const post = await postService.delete(req.params.id)
            res.status(200).json(post)
            
        } catch (error){
            next(error)
        }
    }
    async edit (req,res,next) {
        try {
            const {body, params} = req
            const post = await postService.edit(params.id, body)
            res.status(200).json(post)
        } catch (error) {
            next(error)
        }
    }

    async getOne (req,res,next) {
        try {
            const {id} = req.params
            const post = await postService.getOne(id)
            res.status(200).json(post)
        } catch (error) {
            next(error)
        }
    }

}

module.exports = new PostController()