import http = require("http");
import url = require("url");
import path = require("path");
import fs = require("fs");
import * as staticFileServer from "./../StaticFileServer/StaticFileServer";

/**
 * Routes an incoming request message to the appropriate handler.
 *
 * @param request The incoming request message.
 * @param response The server response.
 */
export function route(request: http.IncomingMessage, response: http.ServerResponse) {
    var pathname = url.parse(request.url).pathname;

    // Default route
    if (pathname === "/") {
        pathname += "messages.html";
    }

    staticFileServer.serve(pathname, response);
}