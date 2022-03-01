const createProjectHandler = async (event) => {
  event.preventDefault();
  const projectTitle = document.querySelector('#project-title').value.trim();
  const projectDeadline = document
    .querySelector('#project-deadline')
    .value.trim();
  const teamElement = document.querySelector('#assign-team');
  const teamID = teamElement.options[teamElement.selectedIndex].dataset.id;

  if (projectTitle && projectDeadline && teamID) {
    const response = await fetch('/api/projects', {
      method: 'POST',
      body: JSON.stringify({
        projectTitle,
        projectDeadline,
        teamID,
      }),

      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.reload();
      alert('Project created succesfully!');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('#project-form')
  .addEventListener('submit', createProjectHandler);
