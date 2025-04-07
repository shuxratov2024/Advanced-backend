//HTTP MODULES - GET,POST,DELETE,PUT
require('dotenv').config()
const express = require('express')

const mongoose = require('mongoose')
const postRouter = require('./router/post.router')
const fileUpload = require('express-fileupload')
const app = express()

app.use(express.json())

app.use("/api/post",postRouter)
app.use(fileUpload({}))

const PORT = process.env.PORT || 5000;
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
