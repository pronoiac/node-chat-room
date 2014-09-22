var socketio = require('socket.io');

var createChat = function (server) {
  var io = socketio(server);
  io.on('connection', function (socket) {
    socket.on("client_message", function (data) { // incoming
      io.emit("server_message", { text: data });  // outgoing
    });
  });
}

module.exports = createChat;
