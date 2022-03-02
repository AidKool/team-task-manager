const { User } = require('../models');

async function findEmployeeID(user) {
  try {
    const userID = await User.findOne({
      where: { username: user.username },
      attributes: ['id'],
    });
    return userID.get({ plain: true });
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = findEmployeeID;
