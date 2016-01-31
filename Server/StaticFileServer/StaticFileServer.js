var path = require("path");
var fs = require("fs");
/**
 * The mime types we know about.
 */
var mimeTypes = {
    html: "text/html",
    css: "text/css",
    js: "text/javascript"
};
/**
 * Serves a static file.
 * Support HTML, JavaScript and CSS files.
 *
 * @param pathname The pathname from the incoming request.
 * @param response The response that the file will be written to.
 */
function serve(pathname, response) {
    var filePath = path.join(process.cwd(), pathname);
    fs.exists(filePath, function (exists) {
        if (exists) {
            var extension = path.extname(filePath).replace(".", "");
            if (mimeTypes[extension]) {
                response.setHeader("content-type", mimeTypes[extension]);
                fs.createReadStream(filePath)
                    .pipe(response);
                return;
            }
        }
        response.statusCode = 404;
        response.end("<h1>Not found</h1>");
    });
}
exports.serve = serve;
//# sourceMappingURL=StaticFileServer.js.map