const router = require('express').Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../config/connection');

const { Team, User, Task } = require('../models');
const renderManagerDashboard = require('../utils/managerDashboard');
const renderEmployeeDashboard = require('../utils/employeeDashboard');

router.get('/', async (req, res) => {
  if (req.session.loggedIn) {
    console.log(req.session.user);
    if (req.session.user.role === 'manager') {
      const { projects, teams } = await renderManagerDashboard();
      console.log(teams);
      return res.render('managerPg', {
        user: req.session.user,
        projects,
        teams,
      });
    }
    req.params.id = req.session.user.id;

    const { userData, completedTasks, inProgressTasks, notStartedTasks } =
      await renderEmployeeDashboard(req, res);
    return res.render('teamMemberPg', {
      userData,
      completedTasks,
      inProgressTasks,
      notStartedTasks,
    });
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

router.get('/users/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);
    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(userData);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get('/users/:id/tasks', async (req, res) => {
  try {
    const { userData, completedTasks, inProgressTasks, notStartedTasks } =
      await renderEmployeeDashboard(req, res);
    return res.render('teamMemberPg', {
      userData,
      completedTasks,
      inProgressTasks,
      notStartedTasks,
    });
    // return res.status(200).json(userTasks);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get('/users/:id/tasks/search?', async (req, res) => {
  try {
    const userTasks = await User.findByPk(req.params.id, {
      attributes: ['id', 'username'],
      include: [
        {
          model: Task,
          where: { status: req.query.status },
          attributes: {
            exclude: ['user_id'],
          },
        },
      ],
    });
    if (!userTasks) {
      return res.status(404).json({ message: 'Data not found' });
    }
    return res.status(200).json(userTasks);
  } catch (error) {
    return res.status(500).json(error);
  }
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

router.get('/teams', async (req, res) => {
  try {
    const users = await sequelize.query(
      'SELECT user.first_name, user.last_name, user.id FROM user WHERE team_id is null AND role = "employee"',
      { type: QueryTypes.SELECT }
    );
    const teamsData = await Team.findAll();
    const teams = teamsData.map((team) => team.get({ plain: true }));
    res.render('manageTeams', { users, teams });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get('/teams/:id/tasks', async (req, res) => {
  const teamID = Number(req.params.id);
  try {
    const rawData = await sequelize.query(
      'SELECT team.name, task.id, task.task_title, task.status, task_deadline FROM team LEFT JOIN user ON team.id = user.team_id LEFT JOIN task ON user.id = task.user_id WHERE team.id = :id',
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
        task_status: item.status,
        task_deadline: item.task_deadline,
      }));

    const completedTasks = tasks.filter(
      (task) => task.task_status === 'completed'
    );
    const inProgressTasks = tasks.filter(
      (task) => task.task_status === 'in_progress'
    );
    const notStartedTasks = tasks.filter(
      (task) => task.task_status === 'not_started'
    );

    const teamData = {
      team_id: teamID,
      name,
      tasks,
      completedTasks,
      inProgressTasks,
      notStartedTasks,
    };

    console.log(teamData);
    return res.render('allTeamTasks', teamData);
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
