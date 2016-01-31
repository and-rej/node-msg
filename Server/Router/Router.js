var url = require("url");
var staticFileServer = require("./../FileManager/FileManager");
var controllers = require("./../Controllers/Messages/MessagesController");
var messagesController = new controllers.MessagesController();
/**
 * Routes an incoming request message to the appropriate handler.
 *
 * @param request The incoming request message.
 * @param response The server response.
 */
function route(request, response) {
    var pathname = url.parse(request.url).pathname;
    // Default route
    if (pathname === "/" || pathname == "/messages" || pathname == "/messages.html") {
        messagesController.index(request, response);
        return;
    }
    if (pathname == "/messages/asJson") {
        messagesController.asJson(request, response);
        return;
    }
    staticFileServer.serve(pathname, response);
}
exports.route = route;
//# sourceMappingURL=Router.js.map