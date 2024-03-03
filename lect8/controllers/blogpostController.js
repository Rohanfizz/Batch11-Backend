const BlogPost = require("../models/blogPostModel");
const ApiFeatures = require("../utils/ApiFeatures");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { NOT_FOUND, OK, CREATED } = require("../utils/statusCodes");

exports.blogpostGetController = catchAsync(async (req, res, next) => {
    let features = new ApiFeatures(BlogPost, req.query)
        .filter()
        .sort()
        .fieldlimiting();
    features = await features.pagination();

    const allBlogPosts = await features.mongooseQuery;
    console.log(features.model);
    return res.status(OK).json({
        status: "success",
        count: allBlogPosts.length,
        data: allBlogPosts,
    });
});

exports.blogpostGetByIdController = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const blogPost = await BlogPost.findById(id);
    if (!blogPost) {
        return next(
            new AppError(`No BlogPost with the given id: ${id}`, NOT_FOUND)
        );
    }
    res.status(OK).json({
        status: "success",
        data: blogPost,
    });
});

exports.blogpostCreateController = catchAsync(async (req, res, next) => {
    const createdPost = await BlogPost.create({
        userName: req.body.userName,
        description: req.body.description,
        image: req.body.image,
        active: req.body.active,
        likes: req.body.likes,
    });

    res.status(CREATED).json({
        status: "success",
        data: {
            createdPost,
        },
    });
});

exports.blogpostUpdateController = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const blogPost = await BlogPost.findByIdAndUpdate(id, req.body);
    if (!blogPost) {
        return next(
            new AppError(`No BlogPost with the given id: ${id}`, NOT_FOUND)
        );
    }
    return res.status(OK).json({
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

    return res.status(OK).json({
        status: "success",
        data: updatedBlogposts,
    });
});

exports.blogpostDeleteById = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const blogPost = await BlogPost.findByIdAndDelete(id);
    if (!blogPost) {
        return next(
            new AppError(`No BlogPost with the given id: ${id}`, NOT_FOUND)
        );
    }
    return res.status(OK).json({
        status: "success",
        data: blogPost,
    });
});

exports.blogpostDeleteAll = catchAsync(async (req, res, next) => {
    console.log(req.user.userName);
    const query = req.query;
    const blogPost = await BlogPost.deleteMany(query);
    return res.status(OK).json({
        status: "success",
        data: blogPost,
    });
});

//delete TODO
