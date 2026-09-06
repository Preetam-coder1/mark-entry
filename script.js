// ========================================
// VARIABLES
// ========================================

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

const searchInput = document.getElementById("searchInput");

const importBtn = document.getElementById("importBtn");
const excelFile = document.getElementById("excelFile");

const downloadBtn = document.getElementById("downloadBtn");


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
// ADD STUDENT
// ========================================

function addStudent() {

    const name = nameInput.value.trim();

    const college = collegeInput.value.trim();

    const roll = rollInput.value.trim();

    const marks = marksInput.value.trim();


    // Marks দেওয়া থাকলে 0-100 check করবে

    if (
        marks !== "" &&
        (Number(marks) < 0 || Number(marks) > 100)
    ) {

        alert("Marks must be between 0 and 100!");

        marksInput.focus();

        return;

    }


    // ====================================
    // EDIT MODE
    // ====================================

    if (editRow !== null) {

        editRow.cells[1].innerText = name;

        editRow.cells[2].innerText = college;

        editRow.cells[3].innerText = roll;

        editRow.cells[4].innerText = marks;


        // Status → Updated

        editRow.cells[5].innerHTML = `
            <span class="status status-updated">
                Updated
            </span>
        `;


        // Green row

        editRow.classList.remove("new-row");

        editRow.classList.add("updated-row");


        editRow = null;

        addBtn.innerHTML = `
            <i class="fa-solid fa-plus"></i>
            Add Student
        `;


        clearInputs();

        nameInput.focus();

        return;

    }


    // ====================================
    // ADD NEW STUDENT
    // ====================================

    studentCount++;

    createStudentRow(
        name,
        college,
        roll,
        marks,
        "New"
    );


    clearInputs();

    nameInput.focus();

}


// ========================================
// CREATE TABLE ROW
// ========================================

function createStudentRow(
    name,
    college,
    roll,
    marks,
    status
) {

    const row = tableBody.insertRow();


    // SL

    row.insertCell(0).innerText = studentCount;


    // Name

    row.insertCell(1).innerText = name;


    // College

    row.insertCell(2).innerText = college;


    // Roll

    row.insertCell(3).innerText = roll;


    // Marks

    row.insertCell(4).innerText = marks;


    // Status

    const statusCell = row.insertCell(5);


    if (status === "Original") {

        statusCell.innerHTML = `
            <span class="status status-original">
                Original
            </span>
        `;

    }

    else if (status === "Updated") {

        statusCell.innerHTML = `
            <span class="status status-updated">
                Updated
            </span>
        `;

        row.classList.add("updated-row");

    }

    else {

        statusCell.innerHTML = `
            <span class="status status-new">
                New
            </span>
        `;

        row.classList.add("new-row");

    }


    // ====================================
    // ACTION CELL
    // ====================================

    const actionCell = row.insertCell(6);


    // EDIT BUTTON

    const editButton = document.createElement("button");

    editButton.innerHTML = `
        <i class="fa-solid fa-pen-to-square"></i>
        Edit
    `;

    editButton.className = "edit-btn";


    editButton.addEventListener("click", function () {

        editStudent(row);

    });


    actionCell.appendChild(editButton);


    // DELETE BUTTON

    const deleteButton = document.createElement("button");

    deleteButton.innerHTML = `
        <i class="fa-solid fa-trash"></i>
        Delete
    `;

    deleteButton.className = "delete-btn";


    deleteButton.addEventListener("click", function () {

        deleteStudent(row);

    });


    actionCell.appendChild(deleteButton);

}


// ========================================
// EDIT STUDENT
// ========================================

function editStudent(row) {

    editRow = row;


    nameInput.value = row.cells[1].innerText;

    collegeInput.value = row.cells[2].innerText;

    rollInput.value = row.cells[3].innerText;

    marksInput.value = row.cells[4].innerText;


    addBtn.innerHTML = `
        <i class="fa-solid fa-rotate"></i>
        Update Student
    `;


    nameInput.focus();

}


// ========================================
// DELETE STUDENT
// ========================================

function deleteStudent(row) {

    row.remove();

    updateSerialNumbers();

}


// ========================================
// UPDATE SERIAL NUMBERS
// ========================================

function updateSerialNumbers() {

    const rows = tableBody.querySelectorAll("tr");


    rows.forEach(function (row, index) {

        row.cells[0].innerText = index + 1;

    });


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
// SEARCH
// ========================================

searchInput.addEventListener("input", function () {

    const searchValue = searchInput.value
        .trim()
        .toLowerCase();


    const rows = tableBody.querySelectorAll("tr");


    rows.forEach(function (row) {

        const name = row.cells[1]
            .innerText
            .toLowerCase();

        const roll = row.cells[3]
            .innerText
            .toLowerCase();


        if (
            name.includes(searchValue) ||
            roll.includes(searchValue)
        ) {

            row.style.display = "";

        }

        else {

            row.style.display = "none";

        }

    });

});


// ========================================
// IMPORT EXCEL BUTTON
// ========================================

importBtn.addEventListener("click", function () {

    excelFile.click();

});


// ========================================
// IMPORT EXCEL
// ========================================

excelFile.addEventListener("change", function (event) {

    const file = event.target.files[0];


    if (!file) {

        return;

    }


    const reader = new FileReader();


    reader.onload = function (e) {

        try {

            const data = new Uint8Array(
                e.target.result
            );


            const workbook = XLSX.read(
                data,
                {
                    type: "array"
                }
            );


            // First sheet

            const worksheet = workbook.Sheets[
                workbook.SheetNames[0]
            ];


            // Excel → JSON

            const students = XLSX.utils.sheet_to_json(
                worksheet,
                {
                    defval: ""
                }
            );


            if (students.length === 0) {

                alert("Excel file is empty!");

                return;

            }


            // Add imported students

            students.forEach(function (student) {

                const name = student.Name || "";

                const college = student.College || "";

                const roll = student.Roll || "";

                const marks = student.Marks || "";


                studentCount++;


                createStudentRow(
                    name,
                    college,
                    roll,
                    marks,
                    "Original"
                );

            });


            alert(
                "Excel data imported successfully!"
            );


        }

        catch (error) {

            console.error(error);

            alert(
                "Could not import Excel file. Please check the file format."
            );

        }


        // Same file আবার select করা যাবে

        excelFile.value = "";

    };


    reader.readAsArrayBuffer(file);

});


// ========================================
// DOWNLOAD EXCEL
// ========================================

downloadBtn.addEventListener(
    "click",
    function () {

        if (tableBody.rows.length === 0) {

            alert(
                "There is no student data to download!"
            );

            return;

        }


        // Temporary table

        const exportTable =
            document.createElement("table");


        // Header

        const header =
            exportTable.insertRow();


        header.insertCell(0).innerText = "SL";

        header.insertCell(1).innerText = "Name";

        header.insertCell(2).innerText = "College";

        header.insertCell(3).innerText = "Roll";

        header.insertCell(4).innerText = "Marks";

        header.insertCell(5).innerText = "Status";


        // Rows

        const rows =
            tableBody.querySelectorAll("tr");


        rows.forEach(function (row) {

            const newRow =
                exportTable.insertRow();


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


            newRow.insertCell(5).innerText =
                row.cells[5].innerText;

        });


        // Create workbook

        const workbook =
            XLSX.utils.table_to_book(
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
