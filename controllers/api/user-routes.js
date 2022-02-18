const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Task } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: {
        exclude: ['password'],
      },
    });
    return res.status(200).json(userData);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
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

router.get('/:id/tasks', async (req, res) => {
  try {
    const userTasks = await User.findByPk(req.params.id, {
      attributes: ['id', 'username'],
      include: [
        {
          model: Task,
          attributes: {
            exclude: ['user_id'],
          },
        },
      ],
    });
    if (!userTasks) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(userTasks);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });
    if (!userData) {
      return res
        .status(404)
        .json({ message: 'Login failed. Please try again.' });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    if (!validPassword) {
      return res
        .status(400)
        .json({ message: 'Login failed. Please try again.' });
    }
    return req.session.save(() => {
      req.session.user = userData;
      req.session.loggedIn = true;
      return res.status(200).json({
        user: userData,
      });
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    return req.session.save(() => {
      req.session.user = userData;
      req.session.loggedIn = true;
      return res.status(201).json(userData);
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post('/logout', async (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => res.status(204).end());
  } else {
    res.status(404).end();
  }
});

module.exports = router;
