const router = require('express').Router();
const { Team, Task, User } = require('../../models');

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

module.exports = router;
