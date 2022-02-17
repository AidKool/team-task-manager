const User = require('./User');
const Task = require('./Task');
const Team = require('./Team');

User.hasMany(Task, {
  foreignKey: 'user_id',
});

Task.belongsTo(User, {
  foreignKey: 'user_id',
});

User.belongsTo(Team, {
  foreignKey: 'user_id',
});

Team.hasMany(User, {
  foreignKey: 'user_id',
});

Team.hasMany(Task, {
  through: {
    model: User,
  },
});

Task.belongsTo(Team, {
  through: {
    model: User,
  },
});

module.exports = { User, Task, Team };
