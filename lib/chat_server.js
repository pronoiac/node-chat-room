var socketio = require('socket.io');

var guestnumber = 1;
var nicknames = {}; // hash, socket ID to nicknames

var createChat = function (server) {
  var io = socketio(server);
  io.on('connection', function (socket) {
    guestnumber += 1;
    nicknames[socket.id] = "guest" + guestnumber
    // console.log(JSON.stringify(nicknames))
    socket.on("client_message", function (message) { // incoming
        io.emit("server_message", message);  // outgoing
      }
    });
    
    socket.on("nicknameChangeRequest", function (newNickname) {
      // check the nickname is unused
      for (var socketId in nicknames) {
        if (nicknames[socketId] === newNickname) {
          socket.emit("nicknameChangeResult", { 
            success: false, 
            message: "Nickname already in use"
          });
          return false;
        }
      }
      nicknames[socket.id] = newNickname;
    })
  });
}

module.exports = createChat;
