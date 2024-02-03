const BlogPost = require("../models/blogPostModel");

exports.blogpostGetController = (req, res) => {};

exports.blogpostGetByIdController = (req, res) => {};

exports.blogpostCreateController = async (req, res) => {
    const createdPost = new BlogPost({
        userName: req.body.userName,
        description: req.body.description,
        image: req.body.image,
    });
    try {
        await createdPost.save();
    } catch (e) {
        res.status(400).json({
            status: "failure",
            message: e.message,
        });
    }

    res.status(201).json({
        status: "success",
        data: {
            createdPost,
        },
    });
};

exports.blogpostUpdateController = (req, res) => {};

//delete TODO
