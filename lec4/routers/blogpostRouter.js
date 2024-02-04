let express = require("express");
const {
    blogpostGetController,
    blogpostGetByIdController,
    blogpostCreateController,
    blogpostUpdateController,
    blogpostBulkUpdateController,
    blogpostDeleteById,
    blogpostDeleteAll,
} = require("../controllers/blogpostController");

const blogpostRouter = express.Router();

// get all blogposts
blogpostRouter.get("/", blogpostGetController);

// get by id
blogpostRouter.get("/:id", blogpostGetByIdController);

// create blogpost
blogpostRouter.post("/", blogpostCreateController);

// update blogpost
blogpostRouter.patch("/:id", blogpostUpdateController);

blogpostRouter.patch("/", blogpostBulkUpdateController);

blogpostRouter.delete("/:id", blogpostDeleteById);

blogpostRouter.delete("/", blogpostDeleteAll);

module.exports = blogpostRouter;
