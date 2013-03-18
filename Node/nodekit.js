#!/usr/bin/env node
var termkit = {
  version: 1,
};

// Load requirements.
var express = require('express')
    io = require('socket.io'),
    router = require("./router");

// Load config file.
var config = require('./config').getConfig();

// Set up http server.
var server = express.createServer();
server.use(express.static(__dirname + '/../HTML'));
server.listen(2222);

// Set up WebSocket and handlers.
var ioServer = io.listen(server); 
ioServer.set('log level', 2)
ioServer.sockets.on('connection', function (client) {
  var p = new router.router(client);
});
