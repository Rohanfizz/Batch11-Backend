const express = require("express");
const blogpostRouter = require("./routers/blogpostRouter");

const app = express();
app.use(express.json()); // to access body

app.use("/blogPost",blogpostRouter)

module.exports = app;
