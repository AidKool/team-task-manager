const { Project, Team } = require('../models');

async function renderManagerDashboard() {
  try {
    const projectsData = await Project.findAll({});
    const projects = projectsData.map((project) =>
      project.get({ plain: true })
    );

    const teamsData = await Team.findAll({});
    const teams = teamsData.map((team) => team.get({ plain: true }));
    return { projects, teams };
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = renderManagerDashboard;
