const express = require('express')
const app = express();

// connect with async await and MongoClient Constructor
// const {MongoClient} = require('mongodb');
// const dbUri = "mongodb://localhost/bookstore";
// const client = new MongoClient(dbUri);

// const database = client.db('bookstore');
// const bookCollection = database.collection('books');

const { connectToDb, getDb } = require('./connect-mongodb');

let bookDb, bookCollection;
connectToDb((err) => {
    if(!err) {
        app.listen(3000, () => {
            console.log('server running on port 3000')
        })
        bookDb = getDb();
        bookCollection = bookDb.collection('books');
    }
})


    

app.get('/books', (req, res) => {
    // async function getAllBooks() {
    //     try {
    //         const books = await bookCollection.find().toArray();
    //         return books;
    //     } catch (err) {
    //         return {error : err};
    //     }
    // }

    // getAllBooks()
    // .then((result) => res.status(200).send(result))
    // .catch((err) => res.status(404).send(err))

    const books = bookCollection.find().toArray()
        .then((result) => res.status(200).send(result))
        .catch((err) => res.status(404).send(err))

})
