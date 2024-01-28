let posts = [];

exports.getAllPosts = async (req, res) => {
    res.status(200).json({
        status: "success",
        data: posts,
    });
};

exports.createPost = async (req, res) => {
    posts.push(req.body);
    res.status(201).json({
        status: "success",
        data: posts[posts.length - 1],
    });
};      

exports.getById = async (req, res) => {
    
    let id = parseInt(req.params.id)

    if(id >= posts.length){
        res.status(404).json({
            status: "failure",
        });    
    }

    res.status(200).json({
        status: "success",
        data: posts[id],
    });
};
