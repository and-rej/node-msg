// Module Imports
// External
import http = require('http');

// Internal
import * as router from "./Router/Router";

// Config
var port = process.env.PORT || 1337;

// Create Server
http.createServer(router.route)
    .listen(port);