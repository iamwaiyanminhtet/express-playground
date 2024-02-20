const {MongoClient} = require('mongodb')

let dbConenction;
module.exports = {
    connectToDb : (cb) => {
        MongoClient.connect('mongodb://localhost/bookstore')
        .then((client) => {
            dbConenction = client.db('bookstore');
            return cb();

        })
        .catch((err) => {
            console.log(err)
            return cb(err);
        })
    },
    getDb : () => dbConenction
}