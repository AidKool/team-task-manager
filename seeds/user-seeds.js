const { User } = require('../models');

const userData = [
  {
    first_name: 'Martha',
    last_name: 'Jones',
    username: 'marthaJ',
    password: 'password1',
    role: 'manager',
    team_id: 1,
  },
  {
    first_name: 'George',
    last_name: 'Parker',
    username: 'georgeM',
    password: 'password2',
    role: 'employee',
    team_id: 1,
  },
  {
    first_name: 'John',
    last_name: 'Smith',
    username: 'agent.smith',
    password: 'password3',
    role: 'employee',
    team_id: 1,
  },
  {
    first_name: 'Mel',
    last_name: 'Clayton',
    username: 'melanie',
    password: 'password4',
    role: 'employee',
    team_id: 1,
  },
  {
    first_name: 'Jess',
    last_name: 'Allen',
    username: 'jess.allen',
    password: 'password5',
    role: 'employee',
    team_id: 1,
  },
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers;
