let todoList = [
  { name: 'Welcome to ZenFocus!', dueDate: '2024-02-25', completed: false },
  { name: 'Check off this task', dueDate: '2024-02-25', completed: false }
];

// Initial Run
document.addEventListener('DOMContentLoaded', () => {
    renderTodoList();
});

function renderTodoList() {
  const container = document.querySelector('.js-todo-list');
  
  let todoListHTML = '';

todoList.forEach((todo, index) => {
    todoListHTML += `
      <div class="todo-row">
        <div class="checkbox"></div>
        
        <div class="todo-info">
            <span class="todo-name">${todo.name}</span>
            <span class="todo-date">${todo.dueDate ? '📅 ' + todo.dueDate : 'No due date'}</span>
        </div>

        <button class="delete-btn">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>
        </button>
      </div>
    `;
  });

  container.innerHTML = todoListHTML;
}

/**
 * Adds a new task to the list
 */
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


