var http = require('http'),
  static = require('node-static'),
  createChat = require('./chat_server');

var file = new static.Server('./public');

var server = http.createServer(function (req, res) {
  req.addListener('end', function () {
    file.serve(req, res);
  }).resume();
});

var port = process.env.PORT || 8000;
console.log("Node app is running at localhost:" + port);
server.listen(port);

createChat(server);