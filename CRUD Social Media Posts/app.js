const express = require("express");
const postsRouter = require("./routes/postsRouter");

const app = express();
app.use(express.json())

app.use("/post", postsRouter);

const port = 8080;
const server = app.listen(port, () => {
    console.log(`App listening on port ${port} ✅`);
});
