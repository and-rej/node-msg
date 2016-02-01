var staticFileServer = require("./../../FileManager/FileManager");
var MessagesController = (function () {
    function MessagesController() {
        this.messages = [];
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
        response.end(JSON.stringify(this.messages));
    };
    /**
     * Creates a new message.
     *
     * @param request The incoming request.
     * @param response The response.
     */
    MessagesController.prototype.create = function (request, response) {
        var body = "";
        var m = this.messages;
        request.on("data", function (data) {
            body += data;
        });
        request.on('end', function () {
            var post = JSON.parse(body);
            m.push(post);
            response.end();
        });
    };
    return MessagesController;
})();
exports.MessagesController = MessagesController;
//# sourceMappingURL=MessagesController.js.map