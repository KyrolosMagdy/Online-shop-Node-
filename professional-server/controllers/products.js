const Product = require('../modules/products'); 

exports.getAddProduct = (req, res) => {
    res.render('add-product', {pageTitle: 'Add Product', currentPath: 'admin/add-product', docTitle: 'Add Product'})
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop', {
            prods: products,
            docTitle: 'My Shop',
            currentPath: '/'
        });
    });
	
}