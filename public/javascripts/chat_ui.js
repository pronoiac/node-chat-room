var socket = io();
var chat = new Chat(socket);

function getMessage(event) {
  var message = $("#outgoing").val();
  return message;
};

function updateGroupMessage(message) {
  console.log(message);
  var $li = $("<li>");
  $li.text(message.user + ": " + message.text);
  $("#group-messages").append($li);
}

function postCurrentStatus(response) {
  var $li1 = $("<li>");
  $li1.text("You are now in: " + response.currentRoom);
  $("#group-messages").append($li1);
  var $li2 = $("<li>");
  $li2.text(response.message);
  $("#group-messages").append($li2);
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