const BlogPost = require("../models/blogPostModel");

exports.blogpostGetController = async (req, res) => {
    const query = req.query;
    const allBlogPosts = await BlogPost.find(query);
    return res.status(200).json({
        status: "success",
        data: allBlogPosts,
    });
};

exports.blogpostGetByIdController = async (req, res) => {
    const id = req.params.id;
    const blogPost = await BlogPost.findById(id);
    return res.status(200).json({
        status: "success",
        data: blogPost,
    });
};

exports.blogpostCreateController = async (req, res) => {
    const createdPost = await BlogPost.create({
        userName: req.body.userName,
        description: req.body.description,
        image: req.body.image,
    });

    res.status(201).json({
        status: "success",
        data: {
            createdPost,
        },
    });
};

exports.blogpostUpdateController = async (req, res) => {
    const id = req.params.id;
    const blogPost = await BlogPost.findByIdAndUpdate(id, req.body);
    return res.status(200).json({
        status: "success",
        data: blogPost,
    });
};
// TODO - debug this. we are getting weird response.
exports.blogpostBulkUpdateController = async (req, res) => {
    const ids = Object.keys(req.body);

    let updatedBlogposts = [];

    for (let id of ids) {
        const blogPost = await BlogPost.findByIdAndUpdate(
            id,
            req.body[id]
        );

        updatedBlogposts.push(blogPost);
    }

    return res.status(200).json({
        status: "success",
        data: updatedBlogposts,
    });
};

exports.blogpostDeleteById = async (req, res) => {
    const id = req.params.id;
    const blogPost = await BlogPost.findByIdAndDelete(id);
    return res.status(200).json({
        status: "success",
        data: blogPost,
    });
};

exports.blogpostDeleteAll = async (req, res) => {
    const query = req.query;
    const blogPost = await BlogPost.deleteMany(query);
    return res.status(200).json({
        status: "success",
        data: blogPost,
    });
};

//delete TODO
