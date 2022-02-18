const { Task } = require('../models');

const taskData = [
  {
    task_title: 'Login',
    task_description: 'Create routes and UI for login screen',
    task_deadline: new Date('2022/03/01'),
    user_id: 2,
  },
  {
    task_title: 'Models',
    task_description: 'Create database models',
    task_deadline: new Date('2022/03/03'),
    user_id: 3,
  },
  {
    task_title: 'Seed database',
    task_description: 'Create seeds to test database',
    task_deadline: new Date('2022/03/04'),
    user_id: 4,
  },
  {
    task_title: 'Add manager view',
    task_description: 'Create view for managers',
    task_deadline: new Date('2022/03/07'),
    user_id: 5,
  },
];

const seedTask = () => Task.bulkCreate(taskData);

module.exports = seedTask;
