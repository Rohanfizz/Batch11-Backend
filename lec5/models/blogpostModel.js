const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please provide a userName."],
    },
    image: {
        type: String,
        required: [true, "Please provide an image link."],
    },
    description: {
        type: String,
        required: [true, "Please provide a description."],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    likes: {
        type: Number,
        default: 0,
    },
    active: {
        type: Boolean,
        default: true,
    },
});

const BlogPost = mongoose.model("BlogPost", blogPostSchema);
module.exports = BlogPost;
