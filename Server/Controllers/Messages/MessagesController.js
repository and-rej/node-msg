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
    return MessagesController;
})();
exports.MessagesController = MessagesController;
//# sourceMappingURL=MessagesController.js.map