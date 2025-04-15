

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  isActivated : Boolean
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
