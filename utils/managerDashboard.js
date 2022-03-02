const { Project, Team } = require('../models');

async function renderManagerDashboard() {
  const projectsData = await Project.findAll({});
  const projects = projectsData.map((project) => project.get({ plain: true }));

  const teamsData = await Team.findAll({});
  const teams = teamsData.map((team) => team.get({ plain: true }));
  return { projects, teams };
}

module.exports = renderManagerDashboard;
