/* eslint-disable no-undef */
const createProjectBtn = document.getElementById('create-project');
const createTeamBtn = document.getElementById('create-team');
const ctx = document.querySelector('.piechart').getContext('2d');
const completeTasks = Number(document.querySelector('.completed').textContent);
const inProgressTasks = Number(
  document.querySelector('.in-progress').textContent
);
const notStartedTasks = Number(
  document.querySelector('.not-started').textContent
);

// eslint-disable-next-line no-unused-vars
const piechart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Completed', 'In Progress', 'Not Started'],
    datasets: [
      {
        label: '# of Votes',
        data: [completeTasks, inProgressTasks, notStartedTasks],
        backgroundColor: [
          'rgb(37, 196, 167)',
          'rgb(252, 224, 138)',
          'rgb(241, 75, 126)',
        ],
      },
    ],
  },
  options: {
    radius: '100%',
    responsive: true,
  },
});

//need fetch path and replace location for each create
const createProject = async (event) => {
  event.preventDefault();
  const response = await fetch('/api/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    document.location.replace('/'); //Need this
  } else {
    alert(response.statusText);
  }
};
const createTeam = async (event) => {
  event.preventDefault();
  const response = await fetch('/api/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    document.location.replace('/'); //Need this
  } else {
    alert(response.statusText);
  }
};

createProjectBtn.addEventListener('click', createProject);
createTeamBtn.addEventListener('click', createTeam);
