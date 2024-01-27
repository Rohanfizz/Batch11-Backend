let http = require("http");

let server = http.createServer((req, res) => {

    if(req.url==='/user'){
        res.write("User Information")
        res.end();
    }else if(req.url==='/profile'){
        res.write("Profile Page")
        res.end();   
    }else {
        res.write("Page Not found")
        res.end()
    }
    
});

let port = 8000;
server.listen(port, () => {
    console.log("Listening on port " + port);
});
