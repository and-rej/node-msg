interface Message {
    author: string;
    text: string;
}

var container = document.getElementById("container");

var xhr = new XMLHttpRequest();
xhr.open("GET", "messages/asJson");
xhr.onload = function () {
    var data = <Array<Message>>JSON.parse(xhr.responseText);
    var html: string = "";
    data.map((message) => {
        html += `
<div>
<h2>${message.author}</h2>
<p>${message.text}</p>
</div>`;
    });
    container.innerHTML = container.innerHTML += html;
};

xhr.send();