const createTaskBtn = document.querySelector('.create-task');
const createTaskForm = document.querySelector('.create-task-form');

const createTaskHandler = async (event) => {
  event.preventDefault();
  const taskTitle = document.querySelector('#task-title').value.trim();
  const taskDeadline = document.querySelector('#task-deadline').value.trim();
  const taskDescription = document
    .querySelector('#task-description')
    .value.trim();
  const userList = document.querySelector('.user-list');
  const userID = userList.options[userList.selectedIndex].dataset.id;

  if (taskTitle && taskDeadline && taskDescription && userID) {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify({
        task_title: taskTitle,
        task_deadline: taskDeadline,
        task_description: taskDescription,
        user_id: userID,
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

function closeModalTask() {
  var element = document.getElementById('modalCreateTask');
  element.classList.remove('is-active');
}

function openModalTask() {
  var element = document.getElementById('modalCreateTask');
  element.classList.add('is-active');
}

createTaskBtn.addEventListener('click', openModalTask);
createTaskForm.addEventListener('submit', createTaskHandler);
