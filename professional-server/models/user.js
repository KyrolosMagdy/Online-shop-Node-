const mongoDb = require('mongodb');
const getDb = require('../util/database').getDb;

class User {
    constructor(userName, email, id, cart) {
        this.name = userName;
        this.email = email;
        this._id = id ? new mongoDb.ObjectId(id) : null;
        this.cart = cart ? cart : [];
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            dbOp = db
                .collection('users')
                .updateOne(
                    { _id: mongoDb.ObjectId(this._id) },
                    { $set: this }
                )
        } else {
            dbOp = db
                .collection('users')
                .insertOne(this)
        }
        dbOp
            .then(result => {
                console.log(result);
            }).catch(err => {
                console.log(err);
            })
    }

    addToCart(product){
        // const cartProduct = this.cart.items.findIndex(cb => {
        //     return cb._id === product._id;
        // });
        const updatedCart = {items: [{productId: new mongoDb.ObjectId(product._id), quantity: 1}]};
        const db = getDb();
        return db.collection('users').updateOne(
            {_id: new mongoDb.ObjectId(this._id)},
            { $set: {cart: updatedCart}}
        );
    }

    static findById(userId) {
        const db = getDb();
        return db
            .collection('users')
            .findOne({ _id: new mongoDb.ObjectId(userId) })
            .then(user => {
                console.log(user);
                return user;
            })
            .catch(err => {
                console.log(err);
            })
    }
}

module.exports = User;