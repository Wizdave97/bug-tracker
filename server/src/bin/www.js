#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('server:server');
var http = require('http');
const diContainer=require('../lib/diContainer').default()
let io=require('socket.io');
diContainer.register('connections',require('../socket/connections').default)
diContainer.factory('__data',require('../__data/data').default)
diContainer.register('models',require('../models'))
diContainer.factory('serverSocketHandler',require('../socket/serverSocketHandler').default)
const connections=diContainer.get('connections')
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
const models=diContainer.get('models')
const serverSocketHandler=diContainer.get('serverSocketHandler')
/**
 * Create HTTP server.
 */

var server = http.createServer(app);
io=io(server)
io.on('connection',function(socket){
  serverSocketHandler(socket,io,connections)
})
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

return models.sequelize.sync().then(result=>{

})
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
