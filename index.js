import express from "express";
import bodyParser from "body-parser";
// import multer from "multer";
// import path from "path";

const app = express();
const port = 3000;

var arrPosts = [];
var idxEdit;
var postView;

app.use(bodyParser.urlencoded({extended: true}));

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "public/uploads"); // Pasta onde as imagens serão armazenadas
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname)); // Nome único para evitar conflitos
//     },
// });

// const upload = multer({ storage: storage });

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {posts: arrPosts});
});

app.post("/", (req, res) => {
    console.log(req.body);
    var action = req.body.action;
    var index = req.body.index;

    if(action === "view"){
        console.log("Viewing action");
        postView = arrPosts[index];
        // res.redirect("/Details");
        res.render("details.ejs", {post: postView, idx: index});
    }

});

app.get("/Create", (req, res) => {
    res.render("create.ejs");
});

app.post("/Create", (req, res) => {

    console.log(req.body);
    var newPost = {
        title: req.body["Title"],
        content: req.body["Content"],
        resume: req.body["Resume"],
        // multimidia: req.file ? "/uploads/" + req.file.filename : "", // Caminho da imagem
    };

    arrPosts.push(newPost);
    
    // console.log(arrPosts);

    res.redirect("/");
});

app.post("/Cancel", (req, res) => {
    res.redirect("/");
});

// app.post("/Details", (req, res) =>{
//     console.log("Indo para aba de detalhes");
//     console.log(req.body);
//     var index = req.body.index;
//     console.log(index);
//     res.render("details.ejs", {post: arrPosts[index]});
// });

app.get("/Details", (req, res) => {
    console.log("Indo para aba de detalhes");
    res.render("details.ejs", {post: postView});
});

app.get("/Details1", (req, res) => {
    console.log("Indo para aba de detalhes 1");
    res.render("details.ejs", {post: arrPosts[0], idx: 0});
});

app.get("/Details2", (req, res) => {
    console.log("Indo para aba de detalhes 2");
    res.render("details.ejs", {post: arrPosts[1], idx: 1});
});

app.get("/Details3", (req, res) => {
    console.log("Indo para aba de detalhes 3");
    res.render("details.ejs", {post: arrPosts[2], idx: 2});
});

app.get("/Details4", (req, res) => {
    console.log("Indo para aba de recentes 1");
    res.render("details.ejs", {post: arrPosts[arrPosts.length-3], idx: arrPosts.length-3});
});

app.get("/Details5", (req, res) => {
    console.log("Indo para aba de recentes 2");
    res.render("details.ejs", {post: arrPosts[arrPosts.length-2], idx: arrPosts.length-2});
});

app.get("/Details6", (req, res) => {
    console.log("Indo para aba de recentes 3");
    res.render("details.ejs", {post: arrPosts[arrPosts.length-1], idx: arrPosts.length-1});
});

app.post("/Details", (req, res) =>{
    console.log(req.body);
    var action = req.body.action;
    var index = req.body.index;

    if(action === "edit"){
        console.log("Editing action");
        var postEdit = arrPosts[index];
        idxEdit = index;
        res.render("create.ejs", {post: postEdit});
    }else{
        console.log("Deleting action");
        arrPosts.splice(index, 1);
        res.redirect("/");
    }
    
});

app.post("/Repost", (req, res) => {
    console.log("Reposting edited post");
    
    arrPosts[idxEdit].title = req.body["Title"];
    arrPosts[idxEdit].content = req.body["Content"];
    arrPosts[idxEdit].resume = req.body["Resume"];
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Application running on port ${port}`);
});