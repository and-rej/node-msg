/**
 * Defines a message.
 */
interface Message {

    /**
     * The author of the message.
     */
    author: string;

    /**
     * The message text.
     */
    text: string;
}

/**
 * Initialises client side functionality for the messages view.
 */
(function () {
    // Get DOM references.
    var container = document.getElementById("container");
    var form = <HTMLFormElement>document.querySelector("form");
    var authorInput = <HTMLInputElement>form.querySelector("input[name=author]");
    var textInput = <HTMLInputElement>form.querySelector("input[name=text]");

    // Init local store of messages.
    var messages: Array<Message> = [];

    // Set up event handler for adding new messages.
    form.onsubmit = onMessageSubmit;

    // Focus author input.
    authorInput.focus();

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
        xhr.onload = () => {
            var newMessages = <Array<Message>>JSON.parse(xhr.responseText);
            updateMessages(newMessages);
        };

        xhr.send();
    }

    /**
     * Updates the view if new messages are present.
     *
     * @param newMessages The new list of messages.
     */
    function updateMessages(newMessages: Array<Message>) {
        if (newMessages.length > messages.length) {
            messages = newMessages;
            var messageNodes: Array<HTMLParagraphElement> = [];
            newMessages.map((message) => {
                var node = document.createElement("p");
                node.innerHTML = `<strong>${message.author}:</strong> ${message.text}`;
                messageNodes.push(node);
            });

            while (container.lastChild) {
                container.removeChild(container.lastChild);
            }

            for (var i = 0; i < messageNodes.length; i++) {
                container.appendChild(messageNodes[i]);
            }

            messageNodes[messageNodes.length - 1].scrollIntoView();
        }
    }

    /**
     * Event handles for submitting of new messages.
     *
     * @param e The form submit event.
     */
    function onMessageSubmit(e: Event) {
        e.preventDefault();

        var author = authorInput.value;
        var text = textInput.value;
        if (author && text) {
            var newMessage = { author, text };
            updateMessages(messages.concat([newMessage]));
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "messages/create");
            xhr.send(JSON.stringify(newMessage));

            textInput.value = "";
            textInput.focus();
        }
    }
})();
