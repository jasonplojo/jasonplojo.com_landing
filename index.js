const express = require('express');
const ssl = require('express-force-ssl');
const app = express();
const http = require('http');
const https = require('https');
const fs = require('fs');

// Certificates for SSL
const options = {
	key: fs.readFileSync('keys/privkey.pem'),
	cert: fs.readFileSync('keys/fullchain.pem')
};

// Redirect http to https
app.use(ssl);

// Root endpoint, response with inside JSON joke
app.get('/', function(req, res) {
	res.send(JSON.stringify({"jason":"true","development":"start","deployed":"false"}));
});

// HTTP server listening on port 8080 on server. Port 80 is forwarded to port 8080 internally
// through IP tables configuration.
http.createServer(app).listen(8080, function() {
	console.log("HTTP listening on port 8080");
});

// HTTPS server listening on port 3000. Port 443 is forwarded to port 3000 internally
// through IP talbes configuration.
https.createServer(options, app).listen(3000, function() {
	console.log("HTTPS listening on port 3000");
});
