const router = require('express').Router();
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
    const teamData = Team.findByPk(req.params.id, {
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
    await Team.update(req.body);
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
