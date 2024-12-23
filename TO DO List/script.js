let tasks = [];

document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
});

function loadTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.classList.toggle("completed", task.completed);
        taskItem.innerHTML = `
            <span onclick="toggleCompletion(${index})">${task.name}</span>
            <div>
                <button class="edit" onclick="editTask(${index})">Edit</button>
                <button class="delete" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}

function addTask() {
    const newTaskInput = document.getElementById("newTaskInput");
    const taskName = newTaskInput.value.trim();
    
    if (taskName !== "") {
        tasks.push({ name: taskName, completed: false });
        newTaskInput.value = "";
        loadTasks();
    }
}

function toggleCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    loadTasks();
}

function editTask(index) {
    const newTaskName = prompt("Edit your task", tasks[index].name);
    
    if (newTaskName !== null && newTaskName.trim() !== "") {
        tasks[index].name = newTaskName.trim();
        loadTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    loadTasks();
}