document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('task-list');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render tasks when DOM is loaded
    renderTasks();

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskItem = createTaskElement(task);
            taskList.appendChild(taskItem);
        });
    }

    // Function to create task element
    function createTaskElement(task) {
        const li = document.createElement('li');
        li.dataset.taskId = task.id;
        li.classList.add('task-item');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTaskCompleted(task.id));
        li.appendChild(checkbox);

        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        taskText.classList.add('task-text');
        if (task.completed) {
            taskText.style.textDecoration = 'line-through';
        }
        li.appendChild(taskText);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editTask(task.id));
        li.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(task.id));
        li.appendChild(deleteButton);

        return li;
    }

    // Function to add new task
    function addTask() {
        const newTaskInput = document.getElementById('new-task');
        const taskText = newTaskInput.value.trim();

        if (taskText !== '') {
            const newTask = {
                id: Date.now(),
                text: taskText,
                completed: false
            };
            tasks.push(newTask);
            saveTasks();
            renderTasks();
            newTaskInput.value = '';
        }
    }

    // Function to save tasks to local storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to edit task
    function editTask(taskId) {
        const task = tasks.find(task => task.id === taskId);
        const newText = prompt('Edit task:', task.text);

        if (newText !== null) {
            task.text = newText.trim();
            saveTasks();
            renderTasks();
        }
    }

    // Function to delete task
    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks();
        renderTasks();
    }

    // Function to toggle task completed status
    function toggleTaskCompleted(taskId) {
        const task = tasks.find(task => task.id === taskId);
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }

    // Event listener for add button click
    document.getElementById('add-button').addEventListener('click', addTask);
});
