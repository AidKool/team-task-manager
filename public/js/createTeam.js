const createTeamForm = document.querySelector('.create-team');
const assignEmployeeTeamForm = document.querySelector('.assign-employee-team');

async function createTeamFormHandler(event) {
  event.preventDefault();

  const teamName = document.querySelector('.team-name').value.trim();

  if (teamName) {
    const response = await fetch('/api/teams/', {
      method: 'POST',
      body: JSON.stringify({ teamName }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

async function assignEmployeeTeamFormHandler(event) {
  event.preventDefault();

  const teamElement = document.querySelector('.select-team');
  const teamID = teamElement.options[teamElement.selectedIndex].dataset.id;
  const employeeElement = document.querySelector('.select-employee');
  const employeeID =
    employeeElement.options[employeeElement.selectedIndex].dataset.id;

  if (teamID && employeeID) {
    const response = await fetch(`/api/users/${employeeID}`, {
      method: 'PATCH',
      body: JSON.stringify({ team_id: teamID }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

createTeamForm.addEventListener('submit', createTeamFormHandler);
assignEmployeeTeamForm.addEventListener(
  'submit',
  assignEmployeeTeamFormHandler
);
