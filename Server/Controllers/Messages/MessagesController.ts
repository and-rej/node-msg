import http = require("http");
import url = require("url");
import path = require("path");
import fs = require("fs");

import * as staticFileServer from "./../../FileManager/FileManager";

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

    /**
     * Gets a JSON representation of all messages on the server.
     *
     * @param request The incoming request.
     * @param response The response.
     */
    asJson(request: http.IncomingMessage, response: http.ServerResponse) {
        var data = [
            { author: "Jim", text: "Hi there!" },
            { author: "Fred", text: "A message." },
            { author: "Andrej", text: "Hello, world!" }
        ];

        response.end(JSON.stringify(data));
    }
}