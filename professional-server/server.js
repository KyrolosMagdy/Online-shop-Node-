const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminData = require('./routes/admin');
const shop = require('./routes/shop');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))


app.use(adminData.routes);
app.use(shop);

app.use( (req, res) => {
	res.render('404', { docTitle: 'Not Found'})
})


app.listen(3000);