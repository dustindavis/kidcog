var http = require('http');
var fs = require('fs');
var port = process.env.PORT || 80;

http.createServer(
function(req, res) {
	res.writeHead(200, { 'Content-Type': 'text/html' });
	fs.readFile('index.html', function(err, data) {
		res.end(data);
	});
}

).listen(port);