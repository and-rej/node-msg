import http = require("http");
import url = require("url");
import path = require("path");
import fs = require("fs");

/**
 * Routes an incoming request message to the appropriate handler.
 *
 * @param request The incoming request message.
 * @param response The server response.
 */
export function route(request: http.IncomingMessage, response: http.ServerResponse) {
    var pathname = url.parse(request.url).pathname;
    if (pathname === "/") {
        pathname += "home.html";
    }

    var uri = "/Views" + pathname;
    var filePath = path.join(process.cwd(), uri);
    fs.exists(filePath, (exists) => {
        if (exists) {
            response.setHeader("content-type", "text/html");
            var fileStream = fs.createReadStream(filePath);
            fileStream.pipe(response);
        } else {
            response.statusCode = 404;
            response.end("<h1>Not found</h1>");
        }
    });
}