const fs = require ('fs');
const express = require('express');
const hbs = require ('hbs');
const port = process.env.PORT || 3000;
var app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/ys'));

var posts  = JSON.parse(fs.readFileSync('./ys/data/blog-posts.json'));
var postsArr = posts.posts;

var post_title = postsArr.map(p => p.title);
var post_body  = postsArr.map( p => p.content );
var post_image = postsArr.map(p => p.thumbnail_images.full.url);


app.get('/', (req, res)=>{
  res.render( 'home.hbs', {
    name: 'Yamen',
    likes : ['technology', 'cats'],
    dislikes : ['people', 'normies']
  });
});

app.get('/posts', (req,res)=>{
  res.render('posts.hbs',
    [{title: post_title,},
    {body: post_body},
    {image: post_image}]
  );
});

app.get('/about', (req, res)=>{
  res.render('about.hbs', {
    title: 'About me from over here',
    year: new Date().getFullYear()
  });
});

app.get('/bad', (req,res)=>{
  res.send ({
    errorMessage: "Can't even"
  });
});

app.listen(port, ()=>{
  console.log(`Server is running on port ${port}`);
});