const { Task } = require('../models');

const taskData = [
  {
    task_title: 'Login',
    task_description: 'Create routes and UI for login screen',
    task_deadline: new Date('2022/03/01'),
    user_id: 1,
  },
];

const seedTask = () => Task.bulkCreate(taskData);

module.exports = seedTask;
