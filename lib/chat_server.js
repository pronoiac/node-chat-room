var socketio = require('socket.io');

var guestnumber = 1;
var nicknames = {}; // hash, socket ID to nicknames
var currentRooms = {}; // hash, user/socket ID to current room

var createChat = function (server) {
  var io = socketio(server);
  io.on('connection', function (socket) {
    guestnumber += 1;
    nicknames[socket.id] = "guest" + guestnumber;
    currentRooms[socket.id] = "#lobby";
    socket.join(currentRooms[socket.id]);
    // new user
    socket.emit("currentStatus", {
      currentRoom: currentRooms[socket.id],
      message: "You are now " + nicknames[socket.id] + "!"
    });
    
    // incoming message
    socket.on("client_message", function (message) { // incoming
      io.to(currentRooms[socket.id]).emit("server_message", {
        user: nicknames[socket.id],
        text: message.text,
        currentRoom: currentRooms[socket.id]
      });  // outgoing
    });
    
    socket.on("nicknameChangeRequest", function (newNickname) {
      // check the nickname is unused
      for (var socketId in nicknames) {
        if (nicknames[socketId] === newNickname) {
          socket.emit("nicknameChangeResult", {
            currentRoom: currentRooms[socket.id],
            success: false,
            message: "Nickname is already in use"
          });
          return;
        }
      }
      
      var guestRegex = /^guest/i;
      if (guestRegex.exec(newNickname)) {
        socket.emit("nicknameChangeResult", {
          currentRoom: currentRooms[socket.id],
          success: false,
          message: "Nickname cannot begin with 'guest'"
        });
        return;
      }
      
      // new nick is ok. 
      var nameChangeAnnounce = {
        currentRoom: currentRooms[socket.id],
        user: nicknames[socket.id],
        text: "is now " + newNickname
      };
      
      
      nicknames[socket.id] = newNickname;
      
      socket.emit("nicknameChangeResult", {
        currentRoom: currentRooms[socket.id],
        success: true,
        message: "You are now " + newNickname + "!"
      });
      
      io.to(currentRooms[socket.id]).emit("server_message", nameChangeAnnounce);
    }); // end nicknameChangeRequest
    
    socket.on("joinRoom", function (newRoom) {
      currentRooms[socket.id] = newRoom;
      socket.join(newRoom);
      socket.emit("joinRoomResponse", {
        success: true,
        currentRoom: currentRooms[socket.id],
        message: "You are now " + nicknames[socket.id] + "!"
      })
    }); // end joinRoom
    
  });
};

module.exports = createChat;
