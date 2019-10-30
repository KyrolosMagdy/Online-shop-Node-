const fs = require('fs');
	/**/
const requestHandler = (req, res) => {
	const url = req.url;
	const method = req.method;
	const users = [];
	if( url === '/'){
		res.write('<html>');
		res.write('<head><title> Node.js </title> </head>');
		res.write('<body> <h1> This course sounds awesome </h1><br /><form action="/create-user" method="POST"> <input type ="text" name="message"><button type="submit"> Send</button></input></from> </body>')
		res.write('<html>');
		return res.end();
	}
	if (url === '/create-user' && method === 'POST'){
		const body = []
		req.on('data', (chunk) => {
			body.push(chunk);
		});
		req.on('end', () => {
			const parseBody = Buffer.concat(body).toString();
			const userName = parseBody.split('=')[1];
			users.push(userName);
			console.log('this is end', users)
			
		});
		res.statusCode = 302;
		res.setHeader('Location', '/users')
		return res.end();
	}
	if( url === '/users'){
		res.write('<html>');
		res.write('<head><title> Users Page </title> </head>');
		console.log('this is users', users)
		if (users.length === 0){
			res.write(`<body> <h1> Please enter some users </h1> </body>`);
		}else{
			users.map(user => {
				res.write(`<body> <h1> Here is my users info..... super secure I know </h1> <ul> <li> ${user} </li> </ul></body>`);
			})
		}
		return res.end();
	}
	
	/*res.setHeader('Content-Type', 'text/html');
	  res.write('<html>');
	  res.write('<head><title>My First Page</title><head>');
	  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
	  res.write('</html>');
	  res.end();
		*/
}

module.exports = requestHandler
