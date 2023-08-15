const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const sortSelect = document.getElementById('sort-select');

let tasks = [];

taskForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const taskInput = document.getElementById('task');
  const dueDateInput = document.getElementById('due-date');

  const newTask = {
    message: taskInput.value,
    dueDate: dueDateInput.value,
    creationDate: new Date(),
    priority: false,
    completed: false
  };

  tasks.push(newTask);
  updateTaskList();

  taskInput.value = '';
  dueDateInput.value = '';
});

taskList.addEventListener('click', function (e) {
  if (e.target.classList.contains('complete-btn')) {
    const taskIndex = e.target.dataset.index;
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    updateTaskList();
  }
});

sortSelect.addEventListener('change', function () {
  const selectedOption = sortSelect.value;
  sortTasks(selectedOption);
  updateTaskList();
});

function updateTaskList() {
  taskList.innerHTML = '';

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const listItem = document.createElement('li');

    listItem.innerHTML = `
      <span>${task.message} - Due: ${task.dueDate}</span>
      <button class="complete-btn" data-index="${i}">${task.completed ? 'Uncomplete' : 'Complete'}</button>
    `;

    if (task.completed) {
      listItem.classList.add('completed');
    }

    taskList.appendChild(listItem);
  }
}

function sortTasks(option) {
  switch (option) {
    case 'messageAsc':
      tasks.sort((a, b) => a.message.localeCompare(b.message));
      break;
    case 'messageDesc':
      tasks.sort((a, b) => b.message.localeCompare(a.message));
      break;
    case 'dueDateAsc':
      tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      break;
    case 'dueDateDesc':
      tasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
      break;
    case 'creationDateAsc':
      tasks.sort((a, b) => a.creationDate - b.creationDate);
      break;
    case 'creationDateDesc':
      tasks.sort((a, b) => b.creationDate - a.creationDate);
      break;
    case 'priorityFirst':
      tasks.sort((a, b) => b.priority - a.priority);
      break;
    default:
      break;
  }
}

// Initial update
updateTaskList();
