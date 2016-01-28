// Module Imports
var http = require('http');
// Config
var port = process.env.PORT || 1337;
// Create Server
http.createServer(handleRequest)
    .listen(port);
// Handle Requests
function handleRequest(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Hello World\n');
}
//# sourceMappingURL=Server.js.map