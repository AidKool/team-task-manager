const { TeamProject } = require('../models');

const teamProjectData = [
  {
    team_id: 1,
    project_id: 2,
  },
  {
    team_id: 2,
    project_id: 3,
  },
  {
    team_id: 3,
    project_id: 1,
  },
];

const seedTeamProject = () => TeamProject.bulkCreate(teamProjectData);

module.exports = seedTeamProject;
