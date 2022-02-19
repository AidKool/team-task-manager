const router = require('express').Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../../config/connection');
const { Team, Task, User } = require('../../models');

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

router.get('/:id', async (req, res) => {
  try {
    const teamData = await Team.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password'],
          },
          include: [
            {
              model: Task,
            },
          ],
        },
      ],
    });
    if (!teamData) {
      return res.status(404).json({ message: 'Team not found' });
    }
    return res.status(200).json(teamData);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get('/:id/tasks', async (req, res) => {
  try {
    const rawData = await sequelize.query(
      'SELECT team.id, project_id, name, task.task_title FROM team LEFT JOIN user ON team.id = user.team_id LEFT JOIN task ON user.id = task.user_id WHERE team.id = :id',
      { type: QueryTypes.SELECT, replacements: { id: req.params.id } }
    );
    if (rawData.length === 0) {
      return res.status(404).json({ message: 'Team not found' });
    }
    const { id, project_id, name } = rawData[0];
    const tasks = rawData
      .filter((item) => item.task_title !== null)
      .map((item) => item.task_title);
    const teamData = {
      id,
      project_id,
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

router.delete('/:id', async (req, res) => {
  try {
    await Team.destroy({ where: { id: req.params.id } });
    return res.status(200).json({ message: 'Team deleted successfully' });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
