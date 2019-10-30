//two routes '/' && '/users'
//add a 'username' input at '/' and a submit buuton POST request to '/create-user'

const http = require('http');
const requestHandler = require('./routes');


const server = http.createServer(requestHandler);
	
/*	res.setHeader('Content-Type', 'text/html');
	res.write('<html>');
	res.write('<head><title> My first page</title> </head>');
	res.write('<body> <h1> Hello </h1></body>')
	res.write('<html>');
	res.end();
*/


server.listen(3000);