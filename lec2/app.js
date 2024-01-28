const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json());

const utilsRouter = require("./routes/utilRoutes");
let posts = fs.readFileSync("posts.json");

app.use("/utils", utilsRouter);

let port = 8080;
const server = app.listen(port, () => {
    console.log(`App is listening on ${port} ✔`);
});
