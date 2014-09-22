var socket = io();
var chat = new Chat(socket);

function getMessage(event) {
  var message = $("#outgoing").val();
  return message;
};

function updateGroupMessage(message) {
  var $li = $("<li>");
  $li.text(message.user + ": " + message.text);
  $("#group-messages").append($li);
}

$(document).ready(function(){
  $("#message-submit").on("click", function(event) {
    event.preventDefault();
    var message = getMessage(event);
    var commandRegex = /\//;
    if (commandRegex.exec(message)) {
      chat.processCommand(message)
    } else {
      chat.sendMessage(message);
    }
    $("#outgoing").val("");
  })
});