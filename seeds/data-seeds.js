const { User } = require('../models');
const { Team } = require('../models');
const { Task } = require('../models');

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

const teamData = [
  {
    project_name: 'Website updates',
    team_manager: '2',
    team_member: '1',
    task_id: '1',
  },
];

const taskData = [
  {
    task_title: 'Login',
    task_description: 'Create routes and UI for login screen',
    task_deadline: 2022 - 03 - 01,
    user_id: 1,
  },
];

const seedUsers = () => User.bulkCreate(userData);
const seedTask = () => Task.bulkCreate(taskData);
const seedTeam = () => Team.bulkCreate(teamData);

module.exports = { seedUsers, seedTask, seedTeam };
