const router = require('express').Router();
const { Project, Team } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const projectsData = await Project.findAll({});
    return res.status(200).json(projectsData);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: Team,
          attributes: {
            exclude: ['id'],
          },
        },
      ],
    });
    if (!projectData) {
      return res.status(404).json({ message: 'Project not found' });
    }
    return res.status(200).json(projectData);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const projectData = await Project.create({
      title: req.body.projectTitle,
      project_deadline: req.body.projectDeadline,
      team_id: req.body.teamID,
    });
    if (!projectData) {
      return res.status(404).json({ message: 'Project not found' });
    }
    return res.status(200).json(projectData);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    await Project.update(req.body, { where: { id: req.params.id } });
    const projectData = await Project.findByPk(req.params.id);
    if (!projectData) {
      return res.status(404).json({ message: 'Project not found' });
    }
    return res.status(200).json({ message: 'Project successfully updated' });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Project.destroy({ where: { id: req.params.id } });
    return res.status(200).json({ message: 'Project successfully deleted' });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
