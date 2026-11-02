// Initial state matching the lab prompt
let todos = [
    { id: 1, text: "See Lecture", completed: false },
    { id: 2, text: "Solve assignment", completed: false }
];
let currentFilter = 'all';

// DOM Elements
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const itemsLeft = document.getElementById('items-left');
const clearCompletedBtn = document.getElementById('clear-completed');
const clearAllBtn = document.getElementById('clear-all');
const filterBtns = document.querySelectorAll('.filter-btn');

// Render todos dynamically using ES6 array methods
function renderTodos() {
    todoList.innerHTML = '';

    const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'active') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true;
    });

    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.dataset.id = todo.id;

        const leftDiv = document.createElement('div');
        leftDiv.className = 'todo-left';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => toggleTodo(todo.id));

        const span = document.createElement('span');
        span.className = 'todo-text';
        span.textContent = todo.text;
        
        // Double-click to edit feature
        span.addEventListener('dblclick', () => startEditing(li, todo));

        leftDiv.appendChild(checkbox);
        leftDiv.appendChild(span);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

        li.appendChild(leftDiv);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });

    updateItemsLeft();
}

// Add a new todo item
function addTodo() {
    const text = todoInput.value.trim();
    if (!text) return;

    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.push(newTodo);
    todoInput.value = '';
    renderTodos();
}

// Toggle completion status
function toggleTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    renderTodos();
}

// Delete a todo item
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

// Inline editing feature on double-click
function startEditing(liElement, todo) {
    const leftDiv = liElement.querySelector('.todo-left');
    const span = leftDiv.querySelector('.todo-text');

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'edit-input';
    input.value = todo.text;

    leftDiv.replaceChild(input, span);
    input.focus();

    const saveEdit = () => {
        const newText = input.value.trim();
        if (newText) {
            todos = todos.map(t => t.id === todo.id ? { ...t, text: newText } : t);
        }
        renderTodos();
    };

    input.addEventListener('blur', saveEdit);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            saveEdit();
        }
    });
}

// Update remaining item count
function updateItemsLeft() {
    const activeCount = todos.filter(t => !t.completed).length;
    itemsLeft.textContent = `${activeCount} item${activeCount === 1 ? '' : 's'} left`;
}

// Event Listeners
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

clearCompletedBtn.addEventListener('click', () => {
    todos = todos.filter(todo => !todo.completed);
    renderTodos();
});

clearAllBtn.addEventListener('click', () => {
    todos = [];
    renderTodos();
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTodos();
    });
});

// Initial render call
renderTodos();