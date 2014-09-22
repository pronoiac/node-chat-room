var socketio = require('socket.io');

var guestnumber = 1;
var nicknames = {}; // hash, socket ID to nicknames

var createChat = function (server) {
  var io = socketio(server);
  io.on('connection', function (socket) {
    guestnumber += 1;
    nicknames[socket.id] = "guest" + guestnumber
    
    // new user
    socket.emit("nicknameChangeResult", {
      success: true,
      message: "You are now " + nicknames[socket.id] + "!"
    }) 
    
    // incoming message
    socket.on("client_message", function (message) { // incoming
      io.emit("server_message", {
        user: nicknames[socket.id],
        text: message.text
      });  // outgoing
    });
    
    socket.on("nicknameChangeRequest", function (newNickname) {
      // check the nickname is unused
      for (var socketId in nicknames) {
        if (nicknames[socketId] === newNickname) {
          socket.emit("nicknameChangeResult", {
            success: false,
            message: "Nickname is already in use"
          })
          return;
        }
      }
      
      var guestRegex = /^guest/i;
      if (guestRegex.exec(newNickname)) {
        socket.emit("nicknameChangeResult", {
          success: false,
          message: "Nickname cannot begin with 'guest'"
        })
        return;
      };
      
      // new nick is ok. 
      var nameChangeAnnounce = {
        user: nicknames[socket.id],
        text: "is now " + newNickname
      }
      
      nicknames[socket.id] = newNickname;
      
      socket.emit("nicknameChangeResult", {
        success: true,
        message: "You are now " + newNickname + "!"
      })
      
      io.emit("server_message", nameChangeAnnounce);
    })
  });
}

module.exports = createChat;
