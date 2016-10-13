import feathers from 'feathers-client' // fetahers-client
// const socketio = require('feathers-socketio/client');
import hooks from 'feathers-hooks'
// const io = require('socket.io-client');

const api = feathers()
  // .configure(feathers.socketio(socket))
  .configure(feathers.rest('http://localhost:3030').fetch(fetch))
  // Use localStorage to store our login token
  .configure(feathers.hooks())
  // Use localStorage to store our login token
  // .configure(feathers.authentication({
  //   storage: window.localStorage
  // }))

export default api
