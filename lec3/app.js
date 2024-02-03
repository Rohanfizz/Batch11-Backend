const express = require("express");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
const blogpostRouter = require("./routes/blogpostRouter");
dotenv.config({ path: "./config.env" });

const app = express();

app.use(express.json());
app.use("/blogpost", blogpostRouter);

const port = 8080;
app.listen(port, () => {
    console.log(`App is listening on port: ${port} ✅`);
});

const DBLink = process.env.DB.replace("<password>", process.env.DB_PASSWORD);
const DB = mongoose.connect(DBLink).then(() => {
    console.log("Connected to DB ♥");
});
