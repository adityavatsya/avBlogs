//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "A passionate learner and actively looking for internship opportunities. I'm very enthusiastic and keen to learn new things.Interested to work in software development, web and app development domains.My major language is C++ for problem solving. Want to be highly skilled in DSA and Web Development.- BE focused in Computer Science from kalinga Institute of Industrial Technology, Bhubaneswar.";
const aboutContent = "A passionate learner and actively looking for internship opportunities. I'm very enthusiastic and keen to learn new things.Interested to work in software development, web and app development domains.My major language is C++ for problem solving. Want to be highly skilled in DSA and Web Development.- BE focused in Computer Science from kalinga Institute of Industrial Technology, Bhubaneswar.";
const contactContent = "Email ID: aaaaditya1515@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://adityavatsya:20051425@cluster0.wtevnq6.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, });

const postSchema = {
    title: String,
    content: String
};

const Post = mongoose.model("Post", postSchema);

// app.get("/", function(req, res){

//   Post.find({}, function(err, posts){
//     res.render("home", {
//       startingContent: homeStartingContent,
//       posts: posts
//       });
//   });
// });


app.get("/", function(req, res) {
    Post.find({})
        .then(function(posts) {
            res.render("home", {
                StartingContent: homeStartingContent,
                posts: posts
            });
        })
        .catch(function(err) {
            console.log(err);
        });
});





app.get("/compose", function(req, res) {
    res.render("compose");
});

// app.post("/compose", function(req, res) {
//     const post = new Post({
//         title: req.body.postTitle,
//         content: req.body.postBody
//     });


//     post.save(function(err) {
//         if (!err) {
//             res.redirect("/");
//         }
//     });
// });

app.post("/compose", function(req, res) {
    const post = new Post({
        title: req.body.postTitle,
        content: req.body.postBody
    });

    post.save()
        .then(function() {
            res.redirect("/");
        })
        .catch(function(err) {
            console.log(err);
        });
});

// app.get("/posts/:postId", function(req, res) {

//     const requestedPostId = req.params.postId;

//     Post.findOne({ _id: requestedPostId }, function(err, post) {
//         res.render("post", {
//             title: post.title,
//             content: post.content
//         });
//     });

// });


app.get("/posts/:postId", function(req, res) {
    const requestedPostId = req.params.postId;

    Post.findOne({ _id: requestedPostId })
        .then(post => {
            res.render("post", {
                title: post.title,
                content: post.content
            });
        })
        .catch(err => {
            console.log(err);
        });
});


app.get("/about", function(req, res) {
    res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function(req, res) {
    res.render("contact", { contactContent: contactContent });
});


app.listen(3000, function() {
    console.log("Server started on port 3000");
});
