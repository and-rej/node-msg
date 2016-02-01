var container = document.getElementById("container");
var form = document.querySelector("form");
form.onsubmit = onMessageSubmit;
var authorInput = form.querySelector("input[name=author]");
var textInput = form.querySelector("input[name=text]");
var messages = [];
function updateMessages() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "messages/asJson");
    xhr.onload = function () {
        var data = JSON.parse(xhr.responseText);
        if (data.length > messages.length) {
            var html = "";
            data.map(function (message) {
                html += "\n<div>\n<h2>" + message.author + "</h2>\n<p>" + message.text + "</p>\n</div>";
            });
            container.innerHTML = html;
        }
    };
    xhr.send();
}
function onMessageSubmit(e) {
    e.preventDefault();
    var author = authorInput.value;
    var text = textInput.value;
    if (author && text) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "messages/create");
        xhr.send(JSON.stringify({ author: author, text: text }));
    }
}
updateMessages();
setInterval(updateMessages, 2000);
//# sourceMappingURL=Messages.js.map