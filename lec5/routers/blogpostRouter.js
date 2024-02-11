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
const { protect } = require("../controllers/authController");

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

blogpostRouter.delete("/:id", protect, blogpostDeleteById);

blogpostRouter.delete("/", protect, blogpostDeleteAll);

module.exports = blogpostRouter;
