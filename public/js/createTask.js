const createTaskHandler = async (event) => {
  event.preventDefault();
  const taskTitle = document.querySelector('#task-title').value.trim();
  const taskDeadline = document.querySelector('#task-deadline').value.trim();
  const taskDescription = document
    .querySelector('#task-description')
    .value.trim();
  const projectSelected = document.querySelector('#project-list').value.trim();

  if (taskTitle && taskDeadline && taskDescription && projectSelected) {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify({
        taskTitle,
        taskDeadline,
        taskDescription,
        projectSelected,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/managerPg');
      alert('Task created succesfully!');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .getElementById('#create-project-btn')
  .addEventListener('click', createProjectHandler);
