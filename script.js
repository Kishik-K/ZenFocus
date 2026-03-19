/**
 * TO-DO LIST - Day 7: LocalStorage Persistence
 */

// Load from localStorage or use defaults
let todoList = JSON.parse(localStorage.getItem('todos')) || [
  { name: 'Welcome to ZenFocus!', dueDate: getTodayDate(), completed: false },
  { name: 'Check off this task', dueDate: getTodayDate(), completed: true }
];

document.addEventListener('DOMContentLoaded', () => {
    setDefaultDate();
    renderTodoList();
});

function renderTodoList() {
  const container = document.querySelector('.js-todo-list');
  let todoListHTML = '';
  
  todoList.forEach((todo, index) => {
    todoListHTML += `
      <div class="todo-row ${todo.completed ? 'completed' : ''}">
        <div class="checkbox" onclick="toggleTodo(${index})"></div>
        <div class="todo-info" onclick="toggleTodo(${index})" style="cursor:pointer">
            <span class="todo-name">${todo.name}</span>
            <span class="todo-date">${todo.dueDate ? '📅 ' + todo.dueDate : 'No due date'}</span>
        </div>
        <button class="delete-btn" onclick="deleteTodo(${index})">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>
        </button>
      </div>
    `;
  });
  container.innerHTML = todoListHTML;
  saveTodos();  // NEW: Save after every render
}

function addTodo() {
  const inputElement = document.querySelector('.js-input');
  const dateInputElement = document.querySelector('.js-date-input');
  const errorEl = document.querySelector('.js-error');
  const name = inputElement.value.trim();
  const dueDate = dateInputElement.value;

  if (!name) {
    errorEl.style.display = 'block';
    inputElement.focus();
    return;
  }
  errorEl.style.display = 'none';
  todoList.push({ name: name, dueDate: dueDate, completed: false });
  inputElement.value = '';
  setDefaultDate(); 
  renderTodoList();
}

function toggleTodo(index) {
    todoList[index].completed = !todoList[index].completed;
    renderTodoList();
}

function deleteTodo(index) {
    todoList.splice(index, 1);
    renderTodoList();
}

function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function setDefaultDate() {
  const dateInput = document.querySelector('.js-date-input');
  if (dateInput) {
    dateInput.value = getTodayDate();
  }
}

/**
 * NEW: Save to localStorage
 */
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todoList));
}

document.querySelector('.js-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTodo();
});
