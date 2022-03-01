const createProjectHandler = async (event) => {
  event.preventDefault();
  const projectTitle = document.querySelector('#project-title').value.trim();
  const projectDeadline = document
    .querySelector('#project-deadline')
    .value.trim();
  const teamElement = document.querySelector('#assign-team');
  const teamID = teamElement.options[teamElement.selectedIndex].dataset.id;
  console.log(teamID.options[teamID.selectedIndex]);

  if (projectTitle && projectDeadline && teamID) {
    const response = await fetch('/api/projects', {
      method: 'POST',
      body: JSON.stringify({
        projectTitle,
        projectDeadline,
        TeamSelected: teamID,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/managerPg');
      alert('Project created succesfully!');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('#create-project-btn')
  .addEventListener('click', createProjectHandler);
