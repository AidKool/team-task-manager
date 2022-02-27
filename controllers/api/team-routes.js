/* eslint-disable camelcase */
const router = require('express').Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../../config/connection');
const { Team, User, TeamProject } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const teamsData = await Team.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'username'],
        },
      ],
    });
    return res.status(200).json(teamsData);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get('/:id/tasks', async (req, res) => {
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

router.get('/:id/tasks/search?', async (req, res) => {
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

router.post('/', async (req, res) => {
  try {
    await Team.create(req.body);
    return res.status(201).json({ message: 'Team successfully created' });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    await Team.update(req.body, { where: { id: req.params.id } });
    const teamData = await Team.findByPk(req.params.id);
    if (!teamData) {
      return res.status(400).json({ message: 'Team not found' });
    }
    return res.status(200).json({ message: 'Team updated' });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post('/:id/project', async (req, res) => {
  try {
    await TeamProject.create({
      team_id: req.params.id,
      project_id: req.body.project_id,
    });
    return res.status(201).json({ message: 'Project successfully added' });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.patch('/:id/project', async (req, res) => {
  try {
    await TeamProject.update(req.body, {
      where: {
        team_id: req.params.id,
      },
    });
    return res.status(201).json({ message: 'Project successfully updated' });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Team.destroy({ where: { id: req.params.id } });
    return res.status(200).json({ message: 'Team deleted successfully' });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
