interface Message {
    author: string;
    text: string;
}

var container = document.getElementById("container");
var form = <HTMLFormElement>document.querySelector("form");
form.onsubmit = onMessageSubmit;
var authorInput = <HTMLInputElement>form.querySelector("input[name=author]");
var textInput = <HTMLInputElement>form.querySelector("input[name=text]");
var messages: Array<Message> = [];

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

updateMessages();
setInterval(updateMessages, 2000);