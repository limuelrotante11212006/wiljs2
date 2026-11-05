const firstNameInput = document.getElementById("firstName");
const middleNameInput = document.getElementById("middleName");
const lastNameInput = document.getElementById("lastName");
const ageInput = document.getElementById("age");
const recordForm = document.getElementById("recordForm");
const recordTable = document.getElementById("recordTable");
const insertButton = document.getElementById("insertButton");
const message = document.getElementById("message");

let records = [
    { firstName: "Andres", middleName: "Rizal", lastName: "Bonifacio", age: 35 },
    { firstName: "Dora", middleName: "The", lastName: "Explorer", age: 10 },
    { firstName: "Gloria", middleName: "Macapagal", lastName: "Arroyo", age: 88 },
    { firstName: "Marlon", middleName: "Marsado", lastName: "Timogan", age: 28 },
    { firstName: "Rodrigo", middleName: "Roa", lastName: "Duterte", age: 66 }
];

let editIndex = -1;

function displayRecords() {
    recordTable.innerHTML = "";

    records.forEach((record, index) => {
        const row = document.createElement("tr");

        ["firstName", "middleName", "lastName", "age"].forEach(key => {
            const cell = document.createElement("td");
            cell.textContent = record[key];
            row.appendChild(cell);
        });

        const actionCell = document.createElement("td");

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.type = "button";
        deleteButton.addEventListener("click", () => deleteRecord(index));

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.type = "button";
        editButton.style.marginLeft = "5px";
        editButton.addEventListener("click", () => editRecord(index));

        actionCell.appendChild(deleteButton);
        actionCell.appendChild(editButton);
        row.appendChild(actionCell);
        recordTable.appendChild(row);
    });
}

function clearForm() {
    recordForm.reset();
    editIndex = -1;
    insertButton.textContent = "Insert";
}

recordForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const newRecord = {
        firstName: firstNameInput.value.trim(),
        middleName: middleNameInput.value.trim(),
        lastName: lastNameInput.value.trim(),
        age: Number(ageInput.value)
    };

    if (!newRecord.firstName || !newRecord.middleName || !newRecord.lastName ||
        !Number.isFinite(newRecord.age) || newRecord.age < 1) {
        alert("Please enter valid information in all fields.");
        return;
    }

    if (editIndex === -1) {
        records.push(newRecord);
        message.textContent = "Record inserted.";
    } else {
        records[editIndex] = newRecord;
        message.textContent = "Record updated.";
    }

    clearForm();
    displayRecords();
});

function deleteRecord(index) {
    records.splice(index, 1);
    displayRecords();
    message.textContent = "Record deleted.";
}

function editRecord(index) {
    const record = records[index];

    firstNameInput.value = record.firstName;
    middleNameInput.value = record.middleName;
    lastNameInput.value = record.lastName;
    ageInput.value = record.age;

    editIndex = index;
    insertButton.textContent = "Update";
    firstNameInput.focus();
}

document.getElementById("clearFormButton").addEventListener("click", clearForm);

document.getElementById("clearRecordsButton").addEventListener("click", function() {
    if (confirm("Are you sure you want to clear all records?")) {
        records = [];
        displayRecords();
        message.textContent = "All records cleared.";
    }
});

function sortRecords() {
    const field = document.getElementById("sortBy").value;
    const order = document.getElementById("sortOrder").value;

    records.sort((a, b) => {
        let result;

        if (field === "age") {
            result = a.age - b.age;
        } else {
            result = a[field].localeCompare(b[field]);
        }

        return order === "asc" ? result : -result;
    });

    displayRecords();
}

document.getElementById("sortBy").addEventListener("change", sortRecords);
document.getElementById("sortOrder").addEventListener("change", sortRecords);

document.getElementById("saveButton").addEventListener("click", function() {
    localStorage.setItem("studentRecords", JSON.stringify(records));
    message.textContent = "Records saved to Local Storage.";
});

const savedRecords = localStorage.getItem("studentRecords");
if (savedRecords !== null) {
    try {
        records = JSON.parse(savedRecords);
    } catch (error) {
        console.error("Could not read saved records.", error);
    }
}

displayRecords();
