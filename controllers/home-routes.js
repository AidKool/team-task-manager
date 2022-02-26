const router = require('express').Router();

const { Project, Team, User } = require('../models');

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
    const teamData = await Team.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password'],
          },
        },
      ],
    });
    if (!teamData) {
      return res.status(404).json({ message: 'Team not found' });
    }
    const team = teamData.get({ plain: true });
    return res.render('viewTeam', team);
    // return res.status(200).json(teamData);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
