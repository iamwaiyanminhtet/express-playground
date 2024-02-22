const Author = require("../models/author");
const express = require('express');

const router = express.Router();

router.get('/author', (req, res) => {
    Author.create({name : "John Doe"})
    .then(() => console.log('Author Saved'))
    .catch((err) => console.log(err))
})
router.get('/all-author', (req, res) => {
    Author.find()
    .then((result) => res.json(result))
    .catch((err) => console.log(err))
})

module.exports = router;