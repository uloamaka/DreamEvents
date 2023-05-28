const mongoose = require("mongoose");

// Create a blog schema
// const blogSchema = new mongoose.Schema({
//   title: String,
//   content: String,
//   author: String,
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
// });

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
  },
  content: {
    type: String,
    // required: true,
  },
  multimedia: {
    type: {
      type: String,
      enum: ["video", "image", "audio", "interactive"],
       required: true,
    },
    url: {
      type: String,
       required: true,
    },
    description: {
      type: String,
       required: true,
    },
  },
  author: {
    type: String,
     required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a blog model
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
