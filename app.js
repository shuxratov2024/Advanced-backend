//HTTP MODULES - GET,POST,DELETE,PUT
require('dotenv').config()
const express = require('express')

const mongoose = require('mongoose')
const postRouter = require('./router/post.router')
const fileUpload = require('express-fileupload')
const requestTime = require('./middlewares/request-time')
const router = require('./router/post.router')
const app = express()
const cookieParser = require('cookie-parser')



app.use(fileUpload({}))

app.use(requestTime)
app.use(express.static('static')) // public papkasini ochish
app.use(express.json())
app.use(cookieParser({}))
app.use("/api/post",postRouter)
app.use("/api/auth", require("./router/auth.route"))

const PORT = process.env.PORT || 8021;
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/amir"; // Standart URL

const bootstrap = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connected to DB");
    
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`MongoDB connected: ${DB_URL}`);
    });
    
  } catch (error) {
    console.error(`Error connecting to DB: ${error.message}`);
    process.exit(1); // Xato bo'lganda ilovani to'xtatish
  }
};

bootstrap();
