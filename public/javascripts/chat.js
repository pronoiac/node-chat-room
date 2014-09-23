var Chat = function (socket) {
  this.socket = socket;
  this.bindMessageHandlers();
  this.room = "#lobby";
};

Chat.prototype.sendMessage = function (data) {
  this.socket.emit ("client_message", { text: data });
};

Chat.prototype.bindMessageHandlers = function () {
  this.socket.on('server_message', function(message){
    updateGroupMessage(message);
  });
  
  this.socket.on('nicknameChangeResult', function(response) {
    console.log(response.message);
  });
  
  this.socket.on("currentStatus", function(response) {
    postCurrentStatus(response);
  });
  
  this.socket.on("joinRoomResponse", function (response) {
    postCurrentStatus(response);
  })
};

Chat.prototype.processCommand = function (message) {
  console.log(message);
  message = message.trim();
  var commandRegex = /^(\/\S+)\s(.+)/;
  var matches = commandRegex.exec(message);
  console.log(matches.length);
  var command = matches[1];
  if (command === "/nick") {
    this.socket.emit ("nicknameChangeRequest", matches[2]);
    return;
  }
  if (command === "/join") {
    this.socket.emit ("joinRoom", matches[2]);
    return;
  }
};