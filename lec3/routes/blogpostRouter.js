let express = require("express");
const {
    blogpostGetController,
    blogpostGetByIdController,
    blogpostCreateController,
} = require("../controllers/blogpostController");

const blogpostRouter = express.Router();

// get all blogposts
blogpostRouter.get("/", blogpostGetController);

// get by id
blogpostRouter.get("/:id", blogpostGetByIdController);

// create blogpost
blogpostRouter.post("/", blogpostCreateController);

// update blogpost
blogpostRouter.patch("/");

module.exports = blogpostRouter