let studentCount = 0;


// Enter key দিয়ে next input-এ যাওয়ার system
document.getElementById("name").addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("college").focus();
    }

});


document.getElementById("college").addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("roll").focus();
    }

});


document.getElementById("roll").addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("marks").focus();
    }

});


document.getElementById("marks").addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        event.preventDefault();

        // Student table-এ add করবে
        addStudent();
    }

});


// Student add function
function addStudent() {

    let name = document.getElementById("name").value.trim();
    let college = document.getElementById("college").value.trim();
    let roll = document.getElementById("roll").value.trim();
    let marks = document.getElementById("marks").value.trim();


    // কোনো field empty কিনা check
    if (name === "" || college === "" || roll === "" || marks === "") {

        alert("Please fill all fields!");
        return;

    }


    studentCount++;


    let tableBody = document.getElementById("tableBody");

    let row = tableBody.insertRow();


    // Table-এ data বসানো
    row.insertCell(0).innerText = studentCount;
    row.insertCell(1).innerText = name;
    row.insertCell(2).innerText = college;
    row.insertCell(3).innerText = roll;
    row.insertCell(4).innerText = marks;


    // সব input clear
    document.getElementById("name").value = "";
    document.getElementById("college").value = "";
    document.getElementById("roll").value = "";
    document.getElementById("marks").value = "";


    // আবার Name input-এ cursor যাবে
    document.getElementById("name").focus();

}


// Excel Download
function downloadExcel() {

    let table = document.getElementById("studentTable");


    let workbook = XLSX.utils.table_to_book(table, {
        sheet: "Students"
    });


    XLSX.writeFile(workbook, "Student_Marks.xlsx");

}