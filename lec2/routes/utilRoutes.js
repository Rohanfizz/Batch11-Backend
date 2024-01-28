let express = require("express");

const utilsRouter = express.Router();
const utilController = require("../controllers/utilController");

utilsRouter.get("/health", utilController.getHealth);
utilsRouter.post("/displayBody",utilController.displayBody)

module.exports = utilsRouter;