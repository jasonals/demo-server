let Hapi = require('hapi');
let server = new Hapi.Server();

server.connection({
  host: '0.0.0.0',
  port: process.env.PORT || 3000,
  cors: true
});

let people = require('./data/people');


server.route([
  { method: 'get', path: '/', handler: (request, reply) => reply('home') },
  { method: 'post', path: '/users', handler: (request, reply) => reply(people.all()) },
  { method: 'get', path: '/users/xml', handler: (request, reply) => reply(people.xml()) },
  { method: 'get', path: '/user/{id}', handler: (request, reply) => reply( people.findById(request.params.id) ) },
]);


server.start(function () {
    console.log('Server started at [' + server.info.uri + ']');
});
