const { Project } = require('../models');

const projectData = [
  {
    title: 'Team Task Manager',
    project_deadline: new Date('2022/05/01'),
    team_id: 1,
  },
];

const seedProject = () => Project.bulkCreate(projectData);

module.exports = seedProject;
