var url = require("url");
var path = require("path");
var fs = require("fs");
/**
 * Routes an incoming request message to the appropriate handler.
 *
 * @param request The incoming request message.
 * @param response The server response.
 */
function route(request, response) {
    var pathname = url.parse(request.url).pathname;
    if (pathname === "/") {
        pathname += "messages.html";
    }
    var uri = "/Views" + pathname;
    var filePath = path.join(process.cwd(), uri);
    fs.exists(filePath, function (exists) {
        if (exists) {
            response.setHeader("content-type", "text/html");
            var fileStream = fs.createReadStream(filePath);
            fileStream.pipe(response);
        }
        else {
            response.statusCode = 404;
            response.end("<h1>Not found</h1>");
        }
    });
}
exports.route = route;
//# sourceMappingURL=Router.js.map