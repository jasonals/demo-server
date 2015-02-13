let _ = require('lodash');
let faker = require('faker');

let people = _.times(50, n => ({
    id: n,
    name: faker.name.findName(),
    avatar: faker.internet.avatar(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    href: `https:///user/${n}`
  })
);


let all = () => people;
let findById = (id) => _.find(people, {id: id} );
let filterById = (ids) => _.filter(people, {id: ids} );

module.exports = { all, findById, filterById };
