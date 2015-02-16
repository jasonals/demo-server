#API Server


### Intro

This code is written using ES6.

`x => x + 1` is `function(x) { return x+ 1}`

`{a, b, c: x}` is `{a: a, b: b, c: x }`

`let x` is similiar to `var x` but scoped inside { } blocks

Learn more in detail at [babeljs documentation](https://babeljs.io/docs/learn-es6/) (previously 6to5) and try it out [here](https://babeljs.io/repl/)



### First server

Implementing a simple api server in [node](http://nodejs.org/) using [hapi](http://hapijs.com/), my framework of choice.

After downloading and installing nodejs from [http://nodejs.org/](http://nodejs.org/) we followed the instructions on [hapijs.com](http://hapijs.com/) to get started in a new folder:

1. `npm init` to create a package.json
2. `npm install hapi --save` to save hapi to package.json dependencies. We do this to keep track of modules our code use and their versions.
3. Create an `index.js` file and insert

  ```js
  let Hapi = require('hapi');

  // Create a server with a host and port
  let server = new Hapi.Server();
  server.connection({
      host: 'localhost',
      port: 8000
  });

  // Add the route
  server.route([
    { method: 'GET', path:'/hello', handler: (request, reply) => reply('hello world') }
  ]);

  // Start the server
  server.start();
  ```
4. Start the server with `node index`
5. Open [localhost:8000/hello](http://localhost:8000/hello)

We observed `hello world` displayed in the browser, success!

### Emitting data

We created a folder called `data` to hold JS files responsible for data creation and in that folder created `people.js`. In this file we entered

```js
let _ = require('lodash');
let faker = require('faker');

let people = _.times(50, n => ({
    id: n,
    name: faker.name.findName(),
    avatar: faker.internet.avatar(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber()
  })
);

let all = () => people;
let findById = (id) => _.find(people, person => person.id == id );

module.exports = { all, findById };

```

This file required two dependencies, [faker](https://github.com/marak/Faker.js/) and [lodash](https://lodash.com/), which needed to be installed. To do this we did `npm install faker lodash --save` which installed and saved them both to package.json. With this file we could now generate 50 fake people for our API.

We then followed these steps to use `people.js` with our server's `index.js` file to display our data:

1. Reference `people.js`

  ```js
  let Hapi = require('hapi');

  let people = require('./data/people');

  // Create a server with a host and port
  let server = new Hapi.Server();
  ```

2. Add a route that will display our people data

  ```js
  server.route([
    { method: 'GET', path:'/hello', handler: (request, reply) => reply('hello world') },
    { method: 'GET', path:'/users', handler: (request, reply) => reply(people.all()) }
  ]);
  ```

3. Add another route to show a single person by id

  ```js
  server.route([
    { method: 'GET', path:'/hello', handler: (request, reply) => reply('hello world') },
    { method: 'GET', path:'/users', handler: (request, reply) => reply( people.all() ) },
    { method: 'GET', path:'/user/{id}', handler: (request, reply) => reply( people.findById(request.params.id) ) }
  ]);
  ```

We restarted the server and viewed [localhost:8000/users](http://localhost:8000/users) which listed 50 fake people generated for us by faker, then we went to [localhost:8000/user/0](http://localhost:8000/user/0) to see the first person in our list

### But wait... there's more

Troy wanted to know how we could then turn this JSON data into XML, so we

1. Went to [npmjs.org](https://www.npmjs.org/)
2. Searched for [JSON to XML](https://www.npmjs.com/search?q=json+to+xml)
3. Picked the first result, [simplexml](https://www.npmjs.com/packages/simplexml), and installed it `npm install simplexml --save`
4. Add it to our server's `index.js` file

  ```js
  let Hapi = require('hapi');
  var simplexml = require('simplexml');

  let people = require('./data/people');

  ```
5. Created a new route to display our people data in XML

  ```js
  server.route([
    { method: 'GET', path:'/hello', handler: (request, reply) => reply('hello world') },
    { method: 'GET', path:'/users', handler: (request, reply) => reply( people.all() ) },
    { method: 'GET', path:'/users/xml', handler: (request, reply) => reply( simplexml.toXML(people.all()) ) },
    { method: 'GET', path:'/user/{id}', handler: (request, reply) => reply( people.findById(request.params.id) ) }
  ]);
  ```
6. Viewed [localhost:8000/users/xml](http://localhost:8000/users/xml) to see our generated XML
