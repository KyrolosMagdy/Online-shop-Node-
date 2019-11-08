const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRoutes = require('./routes/admin');
const shop = require('./routes/shop');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))


app.use(adminRoutes);
app.use(shop);

app.use( (req, res) => {
	res.status(404).sendFile(path.join(__dirname, 'views', 'not-found.html'))
})


app.listen(3000);