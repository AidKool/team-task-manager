const { Team } = require('../models');

const teamData = [
  {
    project_name: 'Website updates',
    team_manager: '2',
    team_member: '1',
    task_id: '1',
  },
];

const seedTeam = () => Team.bulkCreate(teamData);

module.exports = seedTeam;
