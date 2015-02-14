let Hapi = require('hapi');
var simplexml = require('simplexml');

let server = new Hapi.Server();

server.connection({
  host: '0.0.0.0',
  port: process.env.PORT || 3000,
  routes: { cors: true }
});

let people = require('./data/people');

let users = (request, reply) => {
  // console.log(request.headers);
  reply(people.all());
};

let home = (request, reply) => {

  reply('home');
};

server.route([
  { method: 'get', path: '/', handler: home },
  { method: 'get', path: '/users', handler: users, config: { cors: true } },
  { method: 'get', path: '/users/xml', handler: (request, reply) => reply(simplexml.toXML( people.all() )) },
  { method: 'get', path: '/user/{id}', handler: (request, reply) => reply( people.findById(request.params.id) ) },
]);

server.start( () => console.log(`Server started at ${server.info.uri}`) );
