const { User } = require('../models');

const userData = [
  {
    first_name: 'George',
    last_name: 'Parker',
    username: 'georgeM',
    password: 'password1',
    role: 'employee',
  },
  {
    first_name: 'Martha',
    last_name: 'Jones',
    username: 'marthaJ',
    password: 'password2',
    role: 'manager',
  },
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers;
