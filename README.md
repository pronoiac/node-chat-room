Node.js chat room
=================

This is a chat room based on Node.js. It's a *little* like IRC, but it's a class project; it's not fully featured. 

Starting the server
-------------------
Install dependencies. 
Enter the top directory. Run `npm install` to install dependencies - socket.io, mime, and node-static. Then run `node lib/app.js` to start the server. It currently doesn't emit any diagnostic information, so it will start quietly, on localhost. 

Starting the client
-------------------
Go to [http://localhost:8000/](http://localhost:8000/). 

Features
---
* `/nick (newNicknameHere)` - changes your nickname in the room
* `/join (room)` - join a certain chat room
