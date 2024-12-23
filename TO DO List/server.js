const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Endpoint to get all tasks
app.get("/tasks", (req, res) => {
    fs.readFile("data.json", "utf8", (err, data) => {
        if (err) {
            res.status(500).json({ error: "Unable to read tasks." });
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint to add a new task
app.post("/tasks", (req, res) => {
    const newTask = req.body;
    fs.readFile("data.json", "utf8", (err, data) => {
        if (err) {
            res.status(500).json({ error: "Unable to read tasks." });
            return;
        }

        const tasks = JSON.parse(data);
        tasks.push(newTask);
        fs.writeFile("data.json", JSON.stringify(tasks), (err) => {
            if (err) {
                res.status(500).json({ error: "Unable to save task." });
                return;
            }
            res.status(201).json(newTask);
        });
    });
});

// Endpoint to delete a task
app.delete("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    fs.readFile("data.json", "utf8", (err, data) => {
        if (err) {
            res.status(500).json({ error: "Unable to read tasks." });
            return;
        }

        let tasks = JSON.parse(data);
        tasks = tasks.filter((_, index) => index !== taskId);
        
        fs.writeFile("data.json", JSON.stringify(tasks), (err) => {
            if (err) {
                res.status(500).json({ error: "Unable to delete task." });
                return;
            }
            res.status(200).json({ message: "Task deleted successfully." });
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});