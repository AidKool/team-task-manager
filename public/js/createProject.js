const createProjectHandler = async (event) => {
  event.preventDefault();
  const projectTitle = document.querySelector('#project-title').value.trim();
  const projectDeadline = document
    .querySelector('#project-deadline')
    .value.trim();
};
