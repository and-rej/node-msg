/// <reference path="Router/Router.ts" />
// Module Imports
// External
var http = require('http');
// Internal
var router = require("./Router/router");
// Config
var port = process.env.PORT || 1337;
// Create Server
http.createServer(router.route)
    .listen(port);
//# sourceMappingURL=Server.js.map