import http = require("http");
import url = require("url");
import path = require("path");
import fs = require("fs");
import queryString = require("querystring");

import * as staticFileServer from "./../../FileManager/FileManager";

export class MessagesController {

    private messages: Array<any> = [];

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
        response.end(JSON.stringify(this.messages));
    }

    /**
     * Creates a new message.
     *
     * @param request The incoming request.
     * @param response The response.
     */
    create(request: http.IncomingMessage, response: http.ServerResponse) {
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
    }
}