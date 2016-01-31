var staticFileServer = require("./../../FileManager/FileManager");
var MessagesController = (function () {
    function MessagesController() {
    }
    /**
     * Gets a view of all current messages in the system.
     *
     * @param request The incoming request message.
     * @param response The server response.
     */
    MessagesController.prototype.index = function (request, response) {
        staticFileServer.serve("/Views/messages.html", response);
    };
    /**
     * Gets a JSON representation of all messages on the server.
     *
     * @param request The incoming request.
     * @param response The response.
     */
    MessagesController.prototype.asJson = function (request, response) {
        var data = [
            { author: "Jim", text: "Hi there!" },
            { author: "Fred", text: "A message." },
            { author: "Andrej", text: "Hello, world!" }
        ];
        response.end(JSON.stringify(data));
    };
    return MessagesController;
})();
exports.MessagesController = MessagesController;
//# sourceMappingURL=MessagesController.js.map