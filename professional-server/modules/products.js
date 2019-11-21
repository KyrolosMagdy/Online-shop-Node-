//to save products on a file
const fs = require('fs');
const path = require('path');

const currentPath = path.join(
    path.dirname(process.mainModule.filename),
    'data', 
    'products.json'
);

const getProductsFromFile = (cb) => {
    
    fs.readFile(currentPath, (err, fileConstent) => {
        if(err) {
            return cb([]);
        }
        return cb(JSON.parse(fileConstent))
    })
}

/* const products = []; */

module.exports = class product {
    constructor(title) {
        this.title = title;
    }

    save() {
        /* products.push(this); */
        //to save all our products into a file 
        // till we have a DB 
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(currentPath, JSON.stringify(products), (error) => console.log(error))
        });
    }

    static fetchAll(cb) {
        return getProductsFromFile(cb)
    }
}