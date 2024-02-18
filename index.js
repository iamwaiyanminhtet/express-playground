const express = require('express');

const app = express();
app.listen(3000);

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    const frameworks = [
        {name : "React"}, 
        {name : "Vue"}, 
        {name : "Angular"}, 
    ];
    res.render('index', {title : "Home", frameworks})
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

app.use((req,res) => {
    res.sendFile('./views/404.html', {root : __dirname})
})

