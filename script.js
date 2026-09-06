let studentCount = 0;

let editRow = null;


// ========================================
// INPUT ELEMENTS
// ========================================

const nameInput = document.getElementById("name");

const collegeInput = document.getElementById("college");

const rollInput = document.getElementById("roll");

const marksInput = document.getElementById("marks");

const addBtn = document.getElementById("addBtn");

const tableBody = document.getElementById("tableBody");


// ========================================
// FAST DATA ENTRY
// ========================================

// Name → Enter → College

nameInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        event.preventDefault();

        collegeInput.focus();

    }

});


// College → Enter → Roll

collegeInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        event.preventDefault();

        rollInput.focus();

    }

});


// Roll → Enter → Marks

rollInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        event.preventDefault();

        marksInput.focus();

    }

});


// Marks → Enter → Add

marksInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        event.preventDefault();

        addStudent();

    }

});


// ========================================
// ADD BUTTON
// ========================================

addBtn.addEventListener("click", function () {

    addStudent();

});


// ========================================
// ADD / UPDATE STUDENT
// ========================================

function addStudent() {

    const name = nameInput.value.trim();
    const college = collegeInput.value.trim();
    const roll = rollInput.value.trim();
    const marks = marksInput.value.trim();

    // Marks দেওয়া থাকলে শুধু তখন 0-100 check করবে
    if (marks !== "" && (Number(marks) < 0 || Number(marks) > 100)) {
        alert("Marks must be between 0 and 100!");
        marksInput.focus();
        return;
    }

    // EDIT MODE
    if (editRow !== null) {

        editRow.cells[1].innerText = name;
        editRow.cells[2].innerText = college;
        editRow.cells[3].innerText = roll;
        editRow.cells[4].innerText = marks;

        editRow = null;
        addBtn.innerText = "Add Student";

        clearInputs();
        nameInput.focus();

        return;
    }

    // ADD NEW STUDENT
    studentCount++;

    const row = tableBody.insertRow();

    row.insertCell(0).innerText = studentCount;
    row.insertCell(1).innerText = name;
    row.insertCell(2).innerText = college;
    row.insertCell(3).innerText = roll;
    row.insertCell(4).innerText = marks;

    const actionCell = row.insertCell(5);

    // EDIT BUTTON
    const editButton = document.createElement("button");

    editButton.innerText = "Edit";
    editButton.className = "edit-btn";

    editButton.addEventListener("click", function () {
        editStudent(row);
    });

    actionCell.appendChild(editButton);

    // DELETE BUTTON
    const deleteButton = document.createElement("button");

    deleteButton.innerText = "Delete";
    deleteButton.className = "delete-btn";

    deleteButton.addEventListener("click", function () {
        deleteStudent(row);
    });

    actionCell.appendChild(deleteButton);

    clearInputs();
    nameInput.focus();
}


// ========================================
// EDIT STUDENT
// ========================================

function editStudent(row) {

    // Store row

    editRow = row;


    // Table → Input

    nameInput.value = row.cells[1].innerText;

    collegeInput.value = row.cells[2].innerText;

    rollInput.value = row.cells[3].innerText;

    marksInput.value = row.cells[4].innerText;


    // Change button

    addBtn.innerText = "Update Student";


    // Focus Name

    nameInput.focus();

}


// ========================================
// DELETE STUDENT
// ========================================

function deleteStudent(row) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this student?"
    );


    if (!confirmDelete) {

        return;

    }


    // Delete row

    row.remove();


    // Update serial numbers

    updateSerialNumbers();

}


// ========================================
// UPDATE SERIAL NUMBERS
// ========================================

function updateSerialNumbers() {

    const rows = document.querySelectorAll("#tableBody tr");


    rows.forEach(function (row, index) {

        row.cells[0].innerText = index + 1;

    });


    // Update count

    studentCount = rows.length;

}


// ========================================
// CLEAR INPUTS
// ========================================

function clearInputs() {

    nameInput.value = "";

    collegeInput.value = "";

    rollInput.value = "";

    marksInput.value = "";

}


// ========================================
// DOWNLOAD EXCEL
// ========================================

document.getElementById("downloadBtn").addEventListener(
    "click",
    function () {

        // Check if there is any student

        if (tableBody.rows.length === 0) {

            alert("There is no student data to download!");

            return;

        }


        // Create a temporary table
        // so Action column won't go to Excel

        const exportTable = document.createElement("table");


        // Header

        const header = exportTable.insertRow();


        header.insertCell(0).innerText = "SL";

        header.insertCell(1).innerText = "Name";

        header.insertCell(2).innerText = "College";

        header.insertCell(3).innerText = "Roll";

        header.insertCell(4).innerText = "Marks";


        // Student rows

        const rows = tableBody.querySelectorAll("tr");


        rows.forEach(function (row) {

            const newRow = exportTable.insertRow();


            newRow.insertCell(0).innerText =
                row.cells[0].innerText;

            newRow.insertCell(1).innerText =
                row.cells[1].innerText;

            newRow.insertCell(2).innerText =
                row.cells[2].innerText;

            newRow.insertCell(3).innerText =
                row.cells[3].innerText;

            newRow.insertCell(4).innerText =
                row.cells[4].innerText;

        });


        // Convert table to Excel

        const workbook = XLSX.utils.table_to_book(
            exportTable,
            {
                sheet: "Students"
            }
        );


        // Download

        XLSX.writeFile(
            workbook,
            "Student_Marks.xlsx"
        );

    }
);
// ========================================
// SEARCH STUDENT BY NAME OR ROLL
// ========================================

const searchInput = document.getElementById("searchInput");


searchInput.addEventListener("input", function () {

    const searchValue = searchInput.value
        .trim()
        .toLowerCase();


    const rows = tableBody.querySelectorAll("tr");


    rows.forEach(function (row) {

        const name = row.cells[1].innerText.toLowerCase();

        const roll = row.cells[3].innerText.toLowerCase();


        // Name অথবা Roll match করলে দেখাবে

        if (
            name.includes(searchValue) ||
            roll.includes(searchValue)
        ) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

});
