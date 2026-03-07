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
