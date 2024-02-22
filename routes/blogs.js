const Blog = require("../models/blogs");
const express = require('express');

const router = express.Router();

router.get('/testing', (req, res) => {
  Blog.find()
  .populate("author")
  .then(result => res.json(result))
  .catch((err) => console.log(err))
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => res.render('details',{blog:result}))
})

// add new blog to the db
router.post('/add', (req, res) => {
    const blog = new Blog(req.body)

    blog.save()
        .then(() => res.redirect('/'))
        .catch((err) => console.log(err))
})

// update blog
router.post('/update/:id',(req,res) => {
    Blog.updateOne({_id :req.params.id}, req.body)
        .then(result => res.redirect('/'))
        .catch(err => console.log(err))
})

// delete blog
router.delete('/:id', (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
      .then(result => {
        res.json({ redirect: '/' });
      })
      .catch(err => {
        console.log(err);
      });
  });

  module.exports = router;