const BlogPost = require("../models/blogPostModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.blogpostGetController = catchAsync(async (req, res, next) => {
    const query = req.query;
    const allBlogPosts = await BlogPost.find(query);
    return res.status(200).json({
        status: "success",
        data: allBlogPosts,
    });
});

exports.blogpostGetByIdController = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const blogPost = await BlogPost.findById(id);
    if (!blogPost) {
        next(new AppError("Cant find blogpost with given id: " + id, 404));
    }
    res.status(200).json({
        status: "success",
        data: blogPost,
    });
});

exports.blogpostCreateController = catchAsync(async (req, res, next) => {
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
});

exports.blogpostUpdateController = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const blogPost = await BlogPost.findByIdAndUpdate(id, req.body);
    return res.status(200).json({
        status: "success",
        data: blogPost,
    });
});
// TODO - debug this. we are getting weird response.
exports.blogpostBulkUpdateController = catchAsync(async (req, res, next) => {
    const ids = Object.keys(req.body);

    let updatedBlogposts = [];

    for (let id of ids) {
        const blogPost = await BlogPost.findByIdAndUpdate(id, req.body[id]);

        updatedBlogposts.push(blogPost);
    }

    return res.status(200).json({
        status: "success",
        data: updatedBlogposts,
    });
});

exports.blogpostDeleteById = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const blogPost = await BlogPost.findByIdAndDelete(id);
    return res.status(200).json({
        status: "success",
        data: blogPost,
    });
});

exports.blogpostDeleteAll = catchAsync(async (req, res, next) => {
    const query = req.query;
    const blogPost = await BlogPost.deleteMany(query);
    return res.status(200).json({
        status: "success",
        data: blogPost,
    });
});

//delete TODO
