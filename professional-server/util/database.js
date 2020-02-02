const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(
        'mongodb+srv://Kyrolos:jNzpQNvOFCMxBapL@cluster0-s7ktd.mongodb.net/shop?retryWrites=true&w=majority',{
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
    )
        .then(client => {
            console.log('Connected');
            _db = client.db();
            callback();
        }).catch(err => {
            console.log(err);
            throw err; 
        });
};

const getDb = () => {
    if(_db){
        return _db;
    }
    throw 'No Database Found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;