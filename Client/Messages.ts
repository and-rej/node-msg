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
    var container = document.getElementById("container");
    var form = <HTMLFormElement>document.querySelector("form");
    var authorInput = <HTMLInputElement>form.querySelector("input[name=author]");
    var textInput = <HTMLInputElement>form.querySelector("input[name=text]");

    var messages: Array<Message> = [];

    form.onsubmit = onMessageSubmit;

    /**
     * Gets latest message data from the server and updates the view if new messages are present.
     */
    function updateMessages() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "messages/asJson");
        xhr.onload = function () {
            var data = <Array<Message>>JSON.parse(xhr.responseText);
            if (data.length > messages.length) {
                var html: string = "";
                data.map((message) => {
                    html += `
<div>
<h2>${message.author}</h2>
<p>${message.text}</p>
</div>`;
                });
                container.innerHTML = html;
            }
        };

        xhr.send();
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
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "messages/create");
            xhr.send(JSON.stringify({ author, text }));
        }
    }

    // Get initial messages.
    updateMessages();

    // Begin auto-refreshing messages.
    setInterval(updateMessages, 2000);
})();
