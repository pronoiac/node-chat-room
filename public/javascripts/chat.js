var Chat = function (socket) {
  this.socket = socket;
  this.bindMessageHandlers();
}

Chat.prototype.sendMessage = function (data) {
  this.socket.emit ("client_message", { text: data });
}

Chat.prototype.bindMessageHandlers = function () {
  this.socket.on('server_message', function(message){
    updateGroupMessage(message);
  })
  
  this.socket.on('nicknameChangeResult', function(response) {
    console.log(response.message);
  })
}

Chat.prototype.processCommand = function (message) {
  console.log(message);
  message = message.trim();
  var commandRegex = /^(\/\S+)\s(.+)/;
  var matches = commandRegex.exec(message);
  console.log(matches.length)
  var command = matches[1];
  if (command === "/nick") {
    // change nickname to matches[2]
    this.socket.emit ("nicknameChangeRequest", matches[2]);    
  }
}