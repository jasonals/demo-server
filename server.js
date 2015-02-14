let Hapi = require('hapi');
var simplexml = require('simplexml');

let server = new Hapi.Server({
  connections: {
    routes: {
      cors: {
        headers: ['Authorization', 'Content-Type', 'If-None-Match','X-Requested-With']
      }
    }
  }
});

server.connection({
  host: '0.0.0.0',
  port: process.env.PORT || 3000
});

let people = require('./data/people');

let users = (request, reply) => {
  reply(people.all());
};

let home = (request, reply) => {
  reply('home');
};

server.route([
  { method: 'get', path: '/', handler: home },
  { method: 'get', path: '/users', handler: users },
  { method: 'get', path: '/users/xml', handler: (request, reply) => reply(simplexml.toXML( people.all() )) },
  { method: 'get', path: '/user/{id}', handler: (request, reply) => reply( people.findById(request.params.id) ) },
]);

server.start( () => console.log(`Server started at ${server.info.uri}`) );
