const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = require("./app")

dotenv.config({ path: "./.env" });

const port = process.env.PORT || 5501;

const server = app.listen(port, () => {
    console.log(`App listening on ${port}`);
});

const DBlink = process.env.DB.replace("<password>", process.env.DB_PASSWORD);
mongoose.connect(DBlink).then(() => {
    console.log("Connection to DB established ♥");
});
