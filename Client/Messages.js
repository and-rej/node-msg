/**
 * Initialises client side functionality for the messages view.
 */
(function () {
    // Get DOM references.
    var container = document.getElementById("container");
    var form = document.querySelector("form");
    var authorInput = form.querySelector("input[name=author]");
    var textInput = form.querySelector("input[name=text]");
    // Init local store of messages.
    var messages = [];
    // Set up event handler for adding new messages.
    form.onsubmit = onMessageSubmit;
    // Get initial messages.
    getMessages();
    // Begin auto-refreshing messages.
    setInterval(getMessages, 2000);
    /**
     * Gets latest message data from the server and updates the view.
     */
    function getMessages() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "messages/asJson");
        xhr.onload = function () {
            var newMessages = JSON.parse(xhr.responseText);
            updateMessages(newMessages);
        };
        xhr.send();
    }
    /**
     * Updates the view if new messages are present.
     *
     * @param newMessages The new list of messages.
     */
    function updateMessages(newMessages) {
        if (newMessages.length > messages.length) {
            messages = newMessages;
            var html = "";
            newMessages.map(function (message) {
                html += "\n<div>\n<h2>" + message.author + "</h2>\n<p>" + message.text + "</p>\n</div>";
            });
            container.innerHTML = html;
        }
    }
    /**
     * Event handles for submitting of new messages.
     *
     * @param e The form submit event.
     */
    function onMessageSubmit(e) {
        e.preventDefault();
        var author = authorInput.value;
        var text = textInput.value;
        if (author && text) {
            var newMessage = { author: author, text: text };
            updateMessages(messages.concat([newMessage]));
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "messages/create");
            xhr.send(JSON.stringify(newMessage));
        }
    }
})();
//# sourceMappingURL=Messages.js.map