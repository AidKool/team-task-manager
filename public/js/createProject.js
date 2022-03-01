const createProjectHandler = async (event) => {
  event.preventDefault();
  const projectTitle = document.querySelector('#project-title').value.trim();
  const projectDeadline = document
    .querySelector('#project-deadline')
    .value.trim();
  const TeamSelected = document.querySelector('#team-list').value.trim();

  if (projectTitle && projectDeadline && TeamSelected) {
    const response = await fetch('/api/projects', {
      method: 'POST',
      body: JSON.stringify({ projectTitle, projectDeadline, TeamSelected }),
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
