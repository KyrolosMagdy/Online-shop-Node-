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
        const cartProductIndex = this.cart.items.findIndex(cb => {
            return cb.productId.toString() === product._id.toString();
        });
        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];
        if (cartProductIndex >= 0){
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity
        }else {
            updatedCartItems.push({productId: new mongoDb.ObjectId(product._id), quantity: newQuantity})
        }
        const updatedCart = {items: updatedCartItems};
        const db = getDb();
        return db.collection('users').updateOne(
            {_id: new mongoDb.ObjectId(this._id)},
            { $set: {cart: updatedCart}}
        );
    };

    getCart() {
        const db = getDb();
        const productIds = this.cart.items.map(item => {
            return item.productId;
        });
        return db.collection('products')
            .find({_id: {$in: productIds}})
            .toArray().then(products => {
                return products.map(p => {
                    return{...p, quantity: this.cart.items.find(i =>{
                        return i.productId.toString() === p._id.toString();
                        }).quantity
                    }
                })
            });
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