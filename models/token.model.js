const { model } = require('mongoose');
const {Schema} = require('mongoose');

const TokenSchema = new Schema({
    user: {type:Schema.ObjectId, ref: "User"},
    refreshToken: {type:String, required:true},
})

module.exports = model("Token",TokenSchema)