let tasks = []; // Array to store tasks

document.addEventListener("DOMContentLoaded", function() {
    loadTasks(); // Load tasks on page load
});

// Function to load tasks into the list
function loadTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear the current task list

    tasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.classList.toggle("completed", task.completed); // Add 'completed' class if task is marked
        taskItem.innerHTML = `
            <span onclick="toggleCompletion(${index})">${task.name}</span>
            <div>
                <button class="mark-complete" onclick="markAsComplete(${index})">
                    ${task.completed ? "Unmark" : "Mark Complete"}
                </button>
                <button class="edit" onclick="editTask(${index})">Edit</button>
                <button class="delete" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem); // Append task item to the list
    });
}

// Function to add a new task
function addTask() {
    const newTaskInput = document.getElementById("newTaskInput");
    const taskName = newTaskInput.value.trim(); // Get task name and trim whitespace

    if (taskName !== "") {
        tasks.push({ name: taskName, completed: false }); // Add new task to the array
        newTaskInput.value = ""; // Clear the input field
        loadTasks(); // Reload the task list
    }
}

// Function to toggle task completion
function toggleCompletion(index) {
    tasks[index].completed = !tasks[index].completed; // Toggle the completed status
    loadTasks(); // Reload the task list
}

// Function to mark a task as complete
function markAsComplete(index) {
    tasks[index].completed = true; // Mark the task as completed
    loadTasks(); // Reload the task list
}

// Function to edit a task
function editTask(index) {
    const newTaskName = prompt("Edit your task", tasks[index].name); // Prompt for new task name

    if (newTaskName !== null && newTaskName.trim() !== "") {
        tasks[index].name = newTaskName.trim(); // Update task name
        loadTasks(); // Reload the task list
    }
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1); // Remove task from the array
    loadTasks(); // Reload the task list
}
