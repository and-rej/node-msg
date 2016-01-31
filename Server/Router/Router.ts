import http = require("http");
import url = require("url");
import path = require("path");
import fs = require("fs");

import * as staticFileServer from "./../FileManager/FileManager";
import * as controllers from "./../Controllers/Messages/MessagesController";

var messagesController = new controllers.MessagesController();

/**
 * Routes an incoming request message to the appropriate handler.
 *
 * @param request The incoming request message.
 * @param response The server response.
 */
export function route(request: http.IncomingMessage, response: http.ServerResponse) {
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

    if (pathname == "/messages/create") {
        messagesController.create(request, response);
        return;
    }

    staticFileServer.serve(pathname, response);
}