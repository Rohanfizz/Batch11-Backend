const express = require("express");
const { getAllPosts, createPost,getById } = require("../controllers/postsController");

const postsRouter = express.Router();

postsRouter.get("/", getAllPosts);
postsRouter.get("/:id", getById);
postsRouter.post("/", createPost);

module.exports = postsRouter;
