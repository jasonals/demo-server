let _ = require('lodash');

let faker = require('faker');
var simplexml = require('simplexml');



let people = _.times(50, n => ({
    id: n,
    name: faker.name.findName(),
    avatar: faker.internet.avatar(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    href: `https://lunchorders.herokuapp.com/user/${n}`
  })
);


let all = function() { return people; };
let xml = function() {
  return simplexml.toXML(people);
};
let findById = (id) => _.find(people, person => person.id == id );
let filterById = (ids) => _.filter(people, {id: ids.map( id => +id)} );

module.exports = { all, findById, filterById , xml};
