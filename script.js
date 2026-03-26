/**
 * TO-DO LIST CORE LOGIC
 */

// 1. Initialize the list from LocalStorage or use default tasks
let todoList = JSON.parse(localStorage.getItem('todos')) || [
  { name: 'Welcome to ZenFocus!', dueDate: getTodayDate(), completed: false },
  { name: 'Check off this task', dueDate: getTodayDate(), completed: true }
];

// Archive state
let archiveExpanded = true;

// 2. Initial Run
document.addEventListener('DOMContentLoaded', () => {
    setDefaultDate();
    renderTodoList();
});

/**
 * Renders the entire list and updates the progress bar
 */
function renderTodoList() {
  const activeContainer = document.querySelector('.js-todo-list');
  const archiveContainer = document.querySelector('.js-archive-list');
  const archiveSection = document.querySelector('.js-archive-section');
  const archiveCount = document.querySelector('.js-archive-count');
  
  // Separate active and completed tasks
  const activeTasks = todoList.filter(t => !t.completed);
  const completedTasks = todoList.filter(t => t.completed);
  
  // Calculate Progress
  const totalTasks = todoList.length;
  const completedCount = completedTasks.length;
  const percent = totalTasks === 0 ? 0 : Math.round((completedCount / totalTasks) * 100);

  // Update Progress Bar & Text
  updateProgressUI(percent);

  // Handle Empty State for Active Tasks
  if (activeTasks.length === 0 && completedTasks.length === 0) {
    activeContainer.innerHTML = `
      <div class="empty-state" style="text-align: center; padding: 50px 20px; color: #9c8f7a;">
        <div class="emoji" style="font-size: 2.5rem; margin-bottom: 12px;">✨</div>
        <p>All clear! Add a task to start your day.</p>
      </div>
    `;
    archiveSection.style.display = 'none';
    saveTodos();
    return;
  }

  // Render Active Tasks
  let activeHTML = '';
  if (activeTasks.length === 0) {
    activeHTML = `
      <div class="empty-state" style="text-align: center; padding: 30px 20px; color: #9c8f7a;">
        <p style="font-size: 0.9rem;">🎉 All tasks completed!</p>
      </div>
    `;
  } else {
    activeTasks.forEach((todo) => {
      const index = todoList.indexOf(todo);
      activeHTML += `
        <div class="todo-row">
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
  }
  activeContainer.innerHTML = activeHTML;

  // Render Completed Tasks in Archive
  if (completedTasks.length > 0) {
    archiveSection.style.display = 'block';
    archiveCount.textContent = completedTasks.length;
    
    let archiveHTML = '';
    completedTasks.forEach((todo) => {
      const index = todoList.indexOf(todo);
      archiveHTML += `
        <div class="todo-row completed archive-item">
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
    archiveContainer.innerHTML = archiveHTML;
    
    // Maintain archive expanded/collapsed state
    archiveContainer.style.display = archiveExpanded ? 'block' : 'none';
    document.querySelector('.js-archive-toggle').textContent = archiveExpanded ? '▼' : '▶';
  } else {
    archiveSection.style.display = 'none';
  }

  saveTodos();
}

/**
 * Toggle archive visibility
 */
function toggleArchive() {
  archiveExpanded = !archiveExpanded;
  const archiveList = document.querySelector('.js-archive-list');
  const toggle = document.querySelector('.js-archive-toggle');
  
  archiveList.style.display = archiveExpanded ? 'block' : 'none';
  toggle.textContent = archiveExpanded ? '▼' : '▶';
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

  errorEl.style.display = 'none';
  
  // Push new object
  todoList.push({ 
    name: name, 
    dueDate: dueDate, 
    completed: false 
  });
  
  // Reset inputs
  inputElement.value = '';
  setDefaultDate(); 
  
  renderTodoList();
}

/**
 * Utility: Toggle task completion
 */
function toggleTodo(index) {
    todoList[index].completed = !todoList[index].completed;
    renderTodoList();
}

/**
 * Utility: Delete a specific task
 */
function deleteTodo(index) {
    todoList.splice(index, 1);
    renderTodoList();
}

/**
 * Utility: Clear all tasks that are checked off
 */
function clearCompleted() {
    todoList = todoList.filter(todo => !todo.completed);
    renderTodoList();
}

/**
 * Progress Bar Animation Logic
 */
function updateProgressUI(percent) {
    const bar = document.querySelector('.js-progress-bar');
    const text = document.querySelector('.js-progress-text');
    
    if(bar) bar.style.width = `${percent}%`;
    if(text) text.innerText = `${percent}%`;
}

/**
 * Date Helpers
 */
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
 * Local Storage Persistence
 */
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todoList));
}

/**
 * Event Listeners
 */
document.querySelector('.js-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTodo();
});
