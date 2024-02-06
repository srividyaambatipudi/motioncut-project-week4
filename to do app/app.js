document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        const taskText = taskInput.value.trim();
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <button onclick="editTask(this)">Edit</button>
            <button onclick="deleteTask(this)">Delete</button>
            <button onclick="toggleCompleted(this)">Toggle</button>
        `;

        taskList.appendChild(taskItem);
        saveTask(taskText);

        taskInput.value = '';
    }
}

function editTask(button) {
    const taskTextElement = button.parentNode.querySelector('span');
    const newTaskText = prompt('Edit task:', taskTextElement.innerText);
    if (newTaskText !== null) {
        taskTextElement.innerText = newTaskText;
        updateLocalStorage();
    }
}

function deleteTask(button) {
    if (confirm('Are you sure you want to delete this task?')) {
        button.parentNode.remove();
        updateLocalStorage();
    }
}

function toggleCompleted(button) {
    const taskTextElement = button.parentNode.querySelector('span');
    taskTextElement.classList.toggle('completed');
    updateLocalStorage();
}


function saveTask(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = getTasksFromLocalStorage();
    const taskList = document.getElementById('taskList');

    tasks.forEach(taskText => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <button onclick="editTask(this)">Edit</button>
            <button onclick="deleteTask(this)">Delete</button>
            <button onclick="toggleCompleted(this)">Toggle</button>
        `;

        taskList.appendChild(taskItem);
    });
}

function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function updateLocalStorage() {
    let tasks = [];
    document.querySelectorAll('#taskList li span').forEach(task => {
        tasks.push(task.innerText);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
