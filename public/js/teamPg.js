const tableBtns = document.querySelectorAll('.table-btn');
const employeeTaskTables = document.querySelectorAll('.team-tasks-table');

tableBtns.forEach((tableBtn) =>
  tableBtn.addEventListener('click', (event) => {
    const id = event.currentTarget.dataset.id;
    tableBtns.forEach((tableBtn) => {
      tableBtn.classList.remove('is-active');
    });
    event.currentTarget.classList.add('is-active');
    employeeTaskTables.forEach((table) => {
      table.classList.remove('active');
    });
    const selectedTable = document.querySelector(`#${id}`);
    selectedTable.classList.add('active');
  })
);
