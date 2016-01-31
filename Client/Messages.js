var container = document.getElementById("container");
var xhr = new XMLHttpRequest();
xhr.open("GET", "messages/asJson");
xhr.onload = function () {
    var data = JSON.parse(xhr.responseText);
    var html = "";
    data.map(function (message) {
        html += "\n<div>\n<h2>" + message.author + "</h2>\n<p>" + message.text + "</p>\n</div>";
    });
    container.innerHTML = container.innerHTML += html;
};
xhr.send();
//# sourceMappingURL=Messages.js.map