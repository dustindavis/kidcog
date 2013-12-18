var http = require('http');
var fs = require('fs');
var port = process.env.PORT || 80;
var url = require('url');

http.createServer(
function(req, res) {
	var pathname = url.parse(req.url).pathname;
	
	if(pathname.indexOf('.png') > 0) {
	
		res.writeHead(200, { 'Content-Type': 'image/png' });
		
		fs.readFile('.' + pathname, function(err, data) {
			res.end(data);
		});
	
	} else if (pathname.indexOf('.gif') > 0) {
	    
	    res.writeHead(200, { 'Content-Type': 'image/gif' });

	    fs.readFile('.' + pathname, function (err, data) {
	        res.end(data);
	    });
	}
	else {

	    res.writeHead(200, { 'Content-Type': 'text/html' });

        
	    fs.readFile('.' + pathname, function (err, data) {
	        res.end(data);
	    });
	}
}

).listen(port);