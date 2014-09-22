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
}