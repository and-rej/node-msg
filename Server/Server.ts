/// <reference path="Router/Router.ts" />

// Module Imports
// External
import http = require('http');

// Internal
import * as router from "./Router/router";

// Config
var port = process.env.PORT || 1337;

// Create Server
http.createServer(router.route)
    .listen(port);