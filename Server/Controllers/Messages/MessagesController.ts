import http = require("http");
import url = require("url");
import path = require("path");

import * as staticFileServer from "./../../StaticFileServer/StaticFileServer";

export class MessagesController {

    /**
     * Gets a view of all current messages in the system.
     *
     * @param request The incoming request message.
     * @param response The server response.
     */
    index(request: http.IncomingMessage, response: http.ServerResponse) {
        staticFileServer.serve("/Views/messages.html", response);
    }
}