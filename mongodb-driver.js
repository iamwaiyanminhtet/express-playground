const express = require('express')
const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())
// connect with async await and MongoClient Constructor
const {MongoClient, ObjectId} = require('mongodb');
async function connectToDb() {
        const dbUri = "mongodb://localhost/bookstore";
        const client = new MongoClient(dbUri);
        return client;
}
let database, bookCollection;
connectToDb()
.then((client) => {
    app.listen(3000, (err) => {
        console.log('running on port num 3000');
    })
    database = client.db('bookstore');
    bookCollection = database.collection('books');
})
.catch(err => console.log(err))

// const { connectToDb, getDb } = require('./connect-mongodb');
// let bookDb, bookCollection;
// connectToDb((err) => {
//     if(!err) {
//         app.listen(3000, () => {
//             console.log('server running on port 3000')
//         })
//         bookDb = getDb();
//         bookCollection = bookDb.collection('books');
//     }
// })

app.get('/books', (req, res) => {
    async function getAllBooks() {
        try {
            const page = req.query.page || 0;
            const booksPerPage = 2;
            const books = await bookCollection.find().skip(page * booksPerPage).limit(booksPerPage).toArray();
            return books;
        } catch (err) {
            return {error : err};
        }
    }

    getAllBooks()
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(404).json(err))

    // const books = bookCollection.find().toArray()
    //     .then((result) => res.status(200).send(result))
    //     .catch((err) => res.status(404).send(err))
})

app.get('/books/:id', (req, res) => {
    async function getBook() {
        const book = await bookCollection.findOne({_id : new ObjectId(req.params.id)})
        return book;
    }

    if(ObjectId.isValid(req.params.id)) {
        getBook()
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(404).json(err))
    }
})

app.post('/add-book', (req, res) => {
    const book = req.body;
    bookCollection.insertOne(book)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(404).json({error : err}))
})

app.delete('/books/:id', (req, res) => {
    if(ObjectId.isValid(req.params.id)) {
        bookCollection.deleteOne({_id : new ObjectId(req.params.id)})
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(404).json(err))
    }
})

app.patch('/books/:id', (req,res) => {
    if(ObjectId.isValid(req.params.id)) {
        bookCollection.updateOne({_id : new ObjectId(req.params.id)}, {$set : req.body})
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(404).json(err))
    }
})