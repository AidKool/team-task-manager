const createTeamForm = document.querySelector('.create-team');

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

createTeamForm.addEventListener('submit', createTeamFormHandler);
