let fs = require("fs");

console.log("Before reading");

fs.readFile("./text.txt", { encoding: "utf8" }, (err,data) => {
    console.log(data);
});

console.log("After reading");
