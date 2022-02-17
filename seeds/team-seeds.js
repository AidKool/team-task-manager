const { Team } = require('../models');

const teamData = [
  {
    project_id: 1,
    team_member_id: 1,
  },
  {
    project_id: 1,
    team_member_id: 2,
  },
  {
    project_id: 1,
    team_member_id: 3,
  },
  {
    project_id: 1,
    team_member_id: 4,
  },
  {
    project_id: 1,
    team_member_id: 5,
  },
];

const seedTeam = () => Team.bulkCreate(teamData);

module.exports = seedTeam;
