const express = require('express');

const app = express();
const mongoose = require('mongoose');
const Blog = require("./models/blogs");
const { render } = require('ejs');

// connect to mongodb
const dbURI = "mongodb://127.0.0.1:27017/blogs"
mongoose.connect(dbURI)
    .then(() => app.listen(3000))
    .catch((err) => console.log(err))

// set ejs template
app.set('view engine', 'ejs')

// to load asset files like css or images
app.use(express.static('public'))

// to get form data
app.use(express.urlencoded({extended:true}))

// // if the request is matched, it wont go down any further. thus next() assure to go down nonetheless
// app.use((req,res,next) => {
//     console.log(req.url);
//     next();
// })

app.get('/', (req, res) => {
    Blog.find()
        .then((result) => {
            res.render('index', {title : "Home", blogs : result})
        })
        .catch((err) => console.log(err))
})

app.get('/about', (req, res) => {
    res.render('about', {title : "About"})
})

app.get('/about-us', (req, res) => {
    res.render('about')
})

app.get('/contact-me', (req, res) => {
    res.render('contact-me', {title : "Contact"})
})

app.get('/addBlog',(req,res) => {
    res.render('addBlog', {title : "Add Blog"})
})

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => res.render('details',{blog:result}))
})

// add new blog to the db
app.post('/add-blog', (req, res) => {
    const blog = new Blog(req.body)

    blog.save()
        .then(() => res.redirect('/'))
        .catch((err) => console.log(err))
})

// update blog
app.post('/blog/update/:id',(req,res) => {
    Blog.updateOne({_id :req.params.id}, req.body)
        .then(result => res.redirect('/'))
        .catch(err => console.log(err))
})

// delete blog
app.delete('/blog/:id', (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
      .then(result => {
        res.json({ redirect: '/' });
      })
      .catch(err => {
        console.log(err);
      });
  });


app.use((req,res) => {
    res.render('404', {title : "Not Found"})
}) 

