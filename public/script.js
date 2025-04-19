const apiUrl = 'http://localhost:3000/todos';

// Fetch and display todos
async function getTodos() {
    const response = await fetch(apiUrl);
    const todos = await response.json();
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = ''; // Clear current list
    todos.forEach(todo => {
        const li = document.createElement("li");
        li.textContent = todo.task;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function () {
            deleteTodo(todo._id);
        };

        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}

// Add a new todo
async function addTodo() {
    const task = document.getElementById("todo-input").value.trim();
    if (task !== "") {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task })
        });
        const newTodo = await response.json();
        getTodos(); // Refresh list
        document.getElementById("todo-input").value = ""; // Clear input
    }
}

// Delete a todo
async function deleteTodo(id) {
    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        getTodos(); // Refresh list
    }
}

// Event listeners for Add button and Enter key
document.getElementById("add-btn").addEventListener("click", addTodo);
document.getElementById("todo-input").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTodo();
    }
});

// Initial load of todos
getTodos();
