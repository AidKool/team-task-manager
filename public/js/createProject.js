const createProjectHandler = async (event) => {
  event.preventDefault();
  const projectTitle = document.querySelector('#project-title').value.trim();
  const projectDeadline = document
    .querySelector('#project-deadline')
    .value.trim();
  const teamId = document.querySelector('#team-list').value.trim();

  if (projectTitle && projectDeadline && teamId) {
    const response = await fetch('/api/projects', {
      method: 'POST',
      body: JSON.stringify({ projectTitle, projectDeadline, teamId }),
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
