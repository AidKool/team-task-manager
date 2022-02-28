module.exports = {
  percentage: (completedTasks, totalTasks) => {
    const value = parseInt((completedTasks / totalTasks) * 100, 10);
    if (typeof value === 'number' && value >= 0 && value <= 100) {
      return `${value}%`;
    }
    return 'N/A';
  },
};
