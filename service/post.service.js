const postModel = require("../models/post.model.js");
const fileService = require("./file.service.js");

class PostService{
    async create(post,picture) {
        const fileName = fileService.save(picture)
        const newPost = await postModel.create({...post,picture : fileName})
        return newPost
    }

    async getAll() {
        return await postModel.find();
    }
    async delete(id) {
        const post = await postModel.findByIdAndDelete(id)
        return post
    }
    async edit(post,id ){
        if(!id) {
            throw new Error ("ID not found");
        }
        const updateData = await postModel.findByIdAndUpdate(id, post,  {new:true})
        return updateData
    }
    async getOne(id) {
        if(!id) {
            throw new Error ("ID not found");
        }
        const post = await postModel.findById(id)
        return post
    }
}

module.exports = new PostService()