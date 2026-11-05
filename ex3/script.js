const loadButton = document.getElementById("loadButton");
const clearButton = document.getElementById("clearButton");
const todoTableBody = document.getElementById("todoTableBody");
const statusText = document.getElementById("status");

const apiUrl = "https://jsonplaceholder.typicode.com/todos/";

loadButton.addEventListener("click", loadData);
clearButton.addEventListener("click", clearTable);

async function loadData() {
    statusText.textContent = "Loading data...";

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error("Unable to get data from the API.");
        }

        const todos = await response.json();
        todoTableBody.innerHTML = "";

        todos.forEach(todo => {
            const row = document.createElement("tr");

            const userCell = document.createElement("td");
            userCell.textContent = todo.userId;

            const idCell = document.createElement("td");
            idCell.textContent = todo.id;

            const titleCell = document.createElement("td");
            titleCell.textContent = todo.title;

            const completedCell = document.createElement("td");
            completedCell.textContent = todo.completed ? "Yes" : "No";

            row.appendChild(userCell);
            row.appendChild(idCell);
            row.appendChild(titleCell);
            row.appendChild(completedCell);

            todoTableBody.appendChild(row);
        });

        statusText.textContent = "Data loaded successfully. Total records: " + todos.length;
    } catch (error) {
        statusText.textContent = "Error: " + error.message;
    }
}

function clearTable() {
    todoTableBody.innerHTML = "";
    statusText.textContent = "Table cleared.";
}
