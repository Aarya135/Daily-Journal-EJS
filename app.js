const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://Aarya:elsa@cluster0.lxjd0.mongodb.net/blogsDB", {
  useNewUrlParser: true
})

const blogSchema = {
  title: String,
  post: String
}

const Blog = mongoose.model("Blog", blogSchema)



app.get("/", function(req, res) {
  Blog.find({},function(err, blogs){
    res.render("home", {
      posts: blogs
    })
  })
})
app.get("/about", function(req, res) {
  res.render("about")
})
app.get("/compose", function(req, res) {
  res.render("compose")
})
app.post("/compose", function(req, res) {
  var input = {
    title: req.body.title,
    post: req.body.post
  }
  const blog = new Blog({
    title: input.title,
    post: input.post
  })
  blog.save(function(err){
    if(!err)
      res.redirect("/")
  })
})
app.get("/posts/:tname", function(req, res) {
  var test = req.params.tname
  Blog.findOne({title: test}, function(err, blog){
    res.render("post", {
      title: blog.title,
      post: blog.post
  })
  })
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
