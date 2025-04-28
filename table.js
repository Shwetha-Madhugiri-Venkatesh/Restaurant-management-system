let add = document.getElementById("add");
let sort = document.getElementById("sort");
let dialog_box = document.getElementById("dialog_box");
let dialog_box_edit = document.getElementById("dialog_box_edit")
let content = document.getElementById("content");
let table = document.getElementById("table");
let table_no;
let booker;
let phone;
let no_people;
let dining_end;
let dining_start_time;
function style_change_add() {
    document.getElementById("table_no").value = "";
    document.getElementById("booker_name").value = "";
    document.getElementById("phone_no").value = "";
    document.getElementById("no_people").value = "";
    document.getElementById("dining_end").value = "";
    document.getElementById("dining_start").value = "";
    add.style.backgroundColor = "rgba(255,160,122,0.6)";
    add.style.borderColor = "white";
    dialog_box.showModal();
    dialog_box.style.display = "flex";
    content.style.filter = "blur(2px)";
}
function style_change_sort() {
    sort.style.backgroundColor = "rgba(240,230,140,0.6)";
    sort.style.borderColor = "white";
    let extract = JSON.parse(localStorage.getItem("data"));
    let input = document.getElementById("sort_inp").value;
    let new_arr = extract.filter(item => item[0] == input);

    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    if (new_arr.length === 0) {
        let row = document.createElement("tr");
        let data = document.createElement("td");
        data.setAttribute("colspan", "7");
        data.style.textAlign = "center";
        data.textContent = "No matching records found.";
        row.appendChild(data);
        table.appendChild(row);
        return;
    }

    for (let y = 0; y < new_arr.length; y++) {
        let row = document.createElement("tr");

        for (let x = 0; x < 6; x++) {
            let data = document.createElement("td");
            data.setAttribute("class", "td");
            let text = document.createTextNode(new_arr[y][x]);
            data.appendChild(text);
            row.appendChild(data);
        }

        let icon = document.createElement("td");
        icon.setAttribute("class", "td");
        icon.innerHTML = `
            <i id=icon1${y} class="fa-solid fa-pen" style="color: #ff0033; margin-right: 10px;" onclick="edit_page(${y})"></i>
            <i class="fa-solid fa-trash" style="color: #000;" onclick="del_icon(${y})"></i>
        `;
        row.appendChild(icon);
        table.appendChild(row);
    }
}
function close_dialog() {
    dialog_box.close();
    dialog_box.style.display = "none";
    content.style.filter = "blur(0)";
}
function set_end() {
    let dining_start = document.getElementById("dining_start").value;
    document.getElementById("dining_end").setAttribute("min", `${dining_start}`);
}
function set_no_people() {
    if (document.getElementById("table_no").value > 5) {
        document.getElementById("no_people").setAttribute("max", 10);
    }
}

let rows = [];
let count = 0;
let arr;
function save(event) {
    event.preventDefault();
    table_no = document.getElementById("table_no").value;
    booker = document.getElementById("booker_name").value;
    phone = document.getElementById("phone_no").value;
    no_people = document.getElementById("no_people").value;
    dining_end = document.getElementById("dining_end").value;
    dining_start_time = document.getElementById("dining_start").value;
    firstRow = document.getElementById("first");
    if (firstRow) {
        firstRow.remove();
    }
    let extract = JSON.parse(localStorage.getItem("data"));
    for (let x = 0; x < extract.length; x++) {
        if (table_no == extract[x][0] && dining_start_time == extract[x][5] && dining_end == extract[x][4]) {
            alert("The table is already booked at this time! Try for next possible time");
            return;
        }
    }
    arr = [table_no, booker, phone, no_people, dining_end, dining_start_time];
    rows.push(arr);
    let json_data = JSON.stringify(rows);
    localStorage.setItem("data", json_data);
    let row = document.createElement("tr");
    row.setAttribute("id", `row${count}`);
    count++;
    for (let x = 0; x < 6; x++) {
        let data = document.createElement("td");
        let text = document.createTextNode(arr[x]);
        data.appendChild(text);
        data.setAttribute("class", "td");
        row.appendChild(data);
    }
    let icon = document.createElement("td");
    icon.setAttribute("class", "td");
    icon.innerHTML = `
    <i class="fa-solid fa-pen" style="color: #ff0033; margin-right: 10px;" onclick="edit_page(${count})"></i>
    <i class="fa-solid fa-trash" style="color: #000;" onclick="del_icon(${count})"></i>
`;
    row.appendChild(icon);
    table.appendChild(row);
    close_dialog();
}


window.onload = function () {
    let extract = JSON.parse(localStorage.getItem("data"));
    rows = extract;

    if (extract.length) {
        let firstRow = document.getElementById("first");
        if (firstRow) {
            firstRow.remove();
        }
    }
    count = 0;
    for (let y = 0; y < extract.length; y++) {
        let row = document.createElement("tr");
        for (let x = 0; x < 6; x++) {
            let data = document.createElement("td");
            let text = document.createTextNode(extract[y][x]);
            data.appendChild(text);
            data.setAttribute("class", "td");
            row.appendChild(data);
        }
        let icon = document.createElement("td");
        icon.setAttribute("class", "td");
        icon.innerHTML = `
            <i id=icon1${y} class="fa-solid fa-pen" style="color: #ff0033; margin-right: 10px;" onclick="edit_page(${y})"></i>
            <i class="fa-solid fa-trash" style="color: #000;" onclick="del_icon(${y})"></i>
        `;
        row.appendChild(icon);
        table.appendChild(row);
    }
}

function del_icon(index) {
    let extract = JSON.parse(localStorage.getItem("data"));
    let diningStartTime = new Date(extract[index][5]);
    let now = new Date();

    if (now > diningStartTime) {
        alert("Cannot delete this record. Dining has already started!");
        return;
    }

    if (confirm("Are you sure you want to delete this record?")) {
        extract.splice(index, 1);
        rows = extract;
        localStorage.setItem("data", JSON.stringify(rows));
        location.reload();
    } else {
        return;
    }
}

function reset(event) {

    document.getElementById("table_no").value = "";
    document.getElementById("booker_name").value = "";
    document.getElementById("phone_no").value = "";
    document.getElementById("no_people").value = "";
    document.getElementById("dining_end").value = "";
    document.getElementById("dining_start").value = "";
}
// function edit_page(index) {
//     document.getElementById("add_label").innerHTML = "Edit";
//     let table_no_edit = document.getElementById("table_no");
//     let booker_edit = document.getElementById("booker_name");
//     let phone_edit = document.getElementById("phone_no");
//     let no_people_edit = document.getElementById("no_people");
//     let dining_end_edit = document.getElementById("dining_end");
//     let dining_start_time_edit = document.getElementById("dining_start");
//     let arr1 = [table_no_edit,booker_edit,phone_edit,no_people_edit,dining_start_time_edit,dining_end_edit];
//     let save_btn = document.getElementById("save-btn");
//     save_btn.setAttribute("onclick",`edit_save(${index})`);
//     let extract = JSON.parse(localStorage.getItem("data"));
//     console.log(arr1);
//     for(let x=0;x<6;x++){
//         arr1[x].value = extract[index][x];
//     }
//     dialog_box.showModal();
//     dialog_box.style.display = "flex";
//     content.style.filter = "blur(2px)";
// }
function edit_page(index) {
    let extract = JSON.parse(localStorage.getItem("data"));
    let diningStartTime = new Date(extract[index][5]);
    let now = new Date();

    if (now > diningStartTime) {
        alert("Cannot edit this record. Dining has already started!");
        return;
    }

    document.getElementById("add_label").innerHTML = "Edit";
    let table_no_edit = document.getElementById("table_no");
    let booker_edit = document.getElementById("booker_name");
    let phone_edit = document.getElementById("phone_no");
    let no_people_edit = document.getElementById("no_people");
    let dining_end_edit = document.getElementById("dining_end");
    let dining_start_time_edit = document.getElementById("dining_start");
    let arr1 = [table_no_edit, booker_edit, phone_edit, no_people_edit, dining_start_time_edit, dining_end_edit];
    let save_btn = document.getElementById("save-btn");
    save_btn.setAttribute("onclick", `edit_save(${index})`);

    for (let x = 0; x < 6; x++) {
        arr1[x].value = extract[index][x];
    }
    dialog_box.showModal();
    dialog_box.style.display = "flex";
    content.style.filter = "blur(2px)";
}


function edit_save(index) {
    let edit_table_no_value = document.getElementById("table_no").value;
    let edit_booker_value = document.getElementById("booker_name").value;
    let edit_phone_value = document.getElementById("phone_no").value;
    let edit_no_people_value = document.getElementById("no_people").value;
    let edit_dining_start_value = document.getElementById("dining_start").value;
    let edit_dinind_end_value = document.getElementById("dining_end").value;
    let edit_arr_value = [edit_table_no_value, edit_booker_value, edit_phone_value, edit_no_people_value, edit_dining_start_value, edit_dinind_end_value];
    let extract = JSON.parse(localStorage.getItem("data"));
    for (let x = 0; x < 6; x++) {
        extract[index][x] = edit_arr_value[x];
    }
    rows = extract;
    localStorage.setItem("data", JSON.stringify(rows));
    location.reload();
}
