const router = require('express').Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../config/connection');

const { Project, Team, User, Task } = require('../models');

router.get('/', async (req, res) => {
  if (req.session.loggedIn) {
    if (req.session.user.role === 'manager') {
      try {
        const projectsData = await Project.findAll({});
        const projects = projectsData.map((project) =>
          project.get({ plain: true })
        );

        const teamsData = await Team.findAll({});
        const teams = teamsData.map((team) => team.get({ plain: true }));
        return res.render('managerPg', { projects, teams });
      } catch (error) {
        return res.status(500).json(error);
      }
    }
    return res.render('teamMemberPg');
  }
  return res.redirect('/login');
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect('/');
  }
  return res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect('/');
  }
  return res.render('signup');
});

router.get('/teams/:id', async (req, res) => {
  try {
    const teamUsersRawData = await Team.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['id', 'first_name', 'last_name'],
          include: [
            {
              model: Task,
              attributes: ['status'],
            },
          ],
        },
      ],
    });

    const tasksRawData = await sequelize.query(
      'SELECT status, COUNT(task.id) as tasks FROM team LEFT JOIN user ON team.id = user.team_id LEFT JOIN task ON user.id = task.user_id WHERE team.id = :id GROUP BY status',
      { type: QueryTypes.SELECT, replacements: { id: req.params.id } }
    );
    if (!teamUsersRawData || tasksRawData.length === 0) {
      return res.status(404).json({ message: 'Team not found' });
    }

    const numberTeamTasks = tasksRawData.reduce(
      (acc, current) => acc + current.tasks,
      0
    );

    const teamTasksData = Object.fromEntries(
      tasksRawData
        .filter((entry) => entry.status)
        .concat({ status: 'all', tasks: numberTeamTasks })
        .map((entry) => Object.values(entry))
    );

    const { id, name, users } = teamUsersRawData;

    const usersData = users.map((user) => ({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      total_tasks: user.tasks.length,
      completed_tasks: user.tasks.reduce((acc, current) => {
        if (current.status === 'completed') {
          // eslint-disable-next-line no-param-reassign
          acc += 1;
        }
        return acc;
      }, 0),
    }));

    const teamData = { id, name, usersData };

    return res.render('viewTeam', { teamData, teamTasksData });
    // return res.status(200).json(teamData);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get('/teams/:id/tasks', async (req, res) => {
  const teamID = Number(req.params.id);
  try {
    const rawData = await sequelize.query(
      'SELECT team.name, task.task_title, task.id FROM team LEFT JOIN user ON team.id = user.team_id LEFT JOIN task ON user.id = task.user_id WHERE team.id = :id',
      { type: QueryTypes.SELECT, replacements: { id: teamID } }
    );
    if (rawData.length === 0) {
      return res.status(404).json({ message: 'Team not found' });
    }
    const { name } = rawData[0];
    const tasks = rawData
      .filter((item) => item.task_title)
      .map((item) => ({
        task_title: item.task_title,
        task_id: item.id,
      }));
    const teamData = {
      team_id: teamID,
      name,
      tasks,
    };
    return res.status(200).json(teamData);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get('/teams/:id/tasks/search?', async (req, res) => {
  const teamID = Number(req.params.id);
  try {
    const rawData = await sequelize.query(
      'SELECT team.name, task.task_title, task.id FROM team LEFT JOIN user ON team.id = user.team_id LEFT JOIN task ON user.id = task.user_id WHERE team.id = :id AND task.status = :status',
      {
        type: QueryTypes.SELECT,
        replacements: { id: req.params.id, status: req.query.status },
      }
    );
    if (rawData.length === 0) {
      return res.status(404).json({ message: 'Data not found' });
    }
    const { name } = rawData[0];
    const tasks = rawData
      .filter((item) => item.task_title)
      .map((item) => ({
        task_title: item.task_title,
        task_id: item.id,
      }));
    const teamData = {
      team_id: teamID,
      name,
      tasks,
    };
    return res.status(200).json(teamData);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
