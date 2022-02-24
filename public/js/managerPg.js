const createProjectBtn = document.getElementById('create-project');
const createTeamBtn = document.getElementById('create-team');

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

