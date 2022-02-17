const User = require('./User');
const Task = require('./Task');
const Team = require('./Team');

// a User can have many Tasks
User.hasMany(Task, {
  foreignKey: 'user_id',
});

// a Task belongs to one User
Task.belongsTo(User, {
  foreignKey: 'user_id',
});

// a Team can have many Tasks
Team.hasMany(User, {
  foreignKey: 'user_id',
});

// a Task belongs to one Team
User.belongsTo(Team, {
  foreignKey: 'user_id',
});

// Team.belongsToMany(Task, {
//   through: {
//     model: User,
//   },
// });

// Task.belongsTo(Team, {
//   through: {
//     model: User,
//   },
// });

module.exports = { User, Task, Team };
