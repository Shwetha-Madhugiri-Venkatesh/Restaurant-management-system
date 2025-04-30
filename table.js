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
    document.getElementById("table_no").removeAttribute("disabled");
    document.getElementById("booker_name").value = "";
    document.getElementById("phone_no").value = "";
    document.getElementById("no_people").value = "";
    document.getElementById("dining_end").value = "";
    document.getElementById("dining_start").value = "";
    document.getElementById("add_label").innerHTML="Add";
    let reset_btn = document.getElementById("reset-btn");
    reset_btn.setAttribute("onclick", `reset1()`);
    dialog_box.showModal();
    
    dialog_box.style.display = "flex";
    content.style.filter = "blur(2px)";
}
function style_change_sort() {
   
    let extract = JSON.parse(localStorage.getItem("data")) || [];
    let input1 = document.getElementById("sort_inp").value;
    let input = Number(document.getElementById("sort_inp").value);
    let new_arr = extract.filter(item =>item[0] ==input);
    if(input1==""){
        for(let y=0;y<extract.length;y++){
            let dining_start_time_format=new Date(extract[y][4]);
            dining_start_time_format = dining_start_time_format.toLocaleDateString()+" "+dining_start_time_format.toLocaleTimeString();
            dining_end_format=new Date(extract[y][5]);
            dining_end_format = dining_end_format.toLocaleDateString()+" "+dining_end_format.toLocaleTimeString();
            extract[y][4]=dining_start_time_format;
            extract[y][5]=dining_end_format;
            }
            while (table.rows.length > 1) {
                table.deleteRow(1);
            }
        for (let y = 0; y < extract.length; y++) {
            let row = document.createElement("tr");
    
            for (let x = 0; x < 6; x++) {
                let data = document.createElement("td");
                data.setAttribute("class", "td");
                let text = document.createTextNode(extract[y][x]);
                data.appendChild(text);
                row.appendChild(data);
            }
    
            let icon = document.createElement("td");
            icon.setAttribute("class", "td");
            icon.innerHTML = `
                <i class="fa-solid fa-pen" style="margin-right: 10px; cursor: pointer;" onclick="edit_page(${y})"  onmouseover="mouse_over_delete(this)" onmouseleave="mouse_leave_delete(this)"></i>
                <i class="fa-solid fa-trash" style="color: #000; cursor: pointer;" onclick="del_icon(${y})"  onmouseover="mouse_over_edit(this)" onmouseleave="mouse_leave_edit(this)"></i>
            `;
            row.appendChild(icon);
            table.appendChild(row);
        }
        return;
    }
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    if (new_arr.length === 0) {
        let filt_row = document.createElement("tr");
        let filt_data = document.createElement("td");
        filt_data.setAttribute("colspan","7");
        filt_data.innerHTML = "No matching record found!";
        filt_row.appendChild(filt_data);
        table.appendChild(filt_row);
        return;
    }
    for(let y=0;y<extract.length;y++){
        let dining_start_time_format=new Date(extract[y][4]);
        dining_start_time_format = dining_start_time_format.toLocaleDateString()+" "+dining_start_time_format.toLocaleTimeString();
        dining_end_format=new Date(extract[y][5]);
        dining_end_format = dining_end_format.toLocaleDateString()+" "+dining_end_format.toLocaleTimeString();
        extract[y][4]=dining_start_time_format;
        extract[y][5]=dining_end_format;
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
            <i class="fa-solid fa-pen" style="margin-right: 10px; cursor: pointer;" onclick="edit_page(${y})"  onmouseover="mouse_over_delete(this)" onmouseleave="mouse_leave_delete(this)"></i>
            <i class="fa-solid fa-trash" style="color: #000; cursor: pointer;" onclick="del_icon(${y})"  onmouseover="mouse_over_edit(this)" onmouseleave="mouse_leave_edit(this)"></i>
        `;
        row.appendChild(icon);
        table.appendChild(row);
    }
}
function mouse_over_edit(obj){
    obj.style.color="red";
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
let arr;
function save(event) {
    event.preventDefault();
    const form = document.getElementById('form');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    table_no = document.getElementById("table_no").value;
    booker = document.getElementById("booker_name").value;
    phone = document.getElementById("phone_no").value;
    no_people = document.getElementById("no_people").value;
    dining_end = document.getElementById("dining_end").value;
    dining_start_time = document.getElementById("dining_start").value;
    console.log(dining_start_time);
    firstRow = document.getElementById("first");
    if (firstRow) {
        firstRow.remove();
    }
    let today = new Date();
    let diningStartTime = new Date(dining_start_time);
    if(diningStartTime<today){
        alert("You can book today onwards only");
        return;
    }
    if(dining_start_time == dining_end){
        alert("The start and end dates can not be same!");
        return;
    }
    let extract = JSON.parse(localStorage.getItem("data"))||[];
    for (let x = 0; x < extract.length; x++) {
        if (table_no == extract[x][0] && (dining_start_time <= extract[x][5] || dining_end <= extract[x][5])) {
            alert("The table is already booked at this time! Try for next possible time");
            return;
        }
    }
    let dining_start_time_format=new Date(dining_start_time);
    dining_start_time_format = dining_start_time_format.toLocaleDateString()+" "+dining_start_time_format.toLocaleTimeString();
    dining_end_format=new Date(dining_end);
    dining_end_format = dining_end_format.toLocaleDateString()+" "+dining_end_format.toLocaleTimeString();
    arr = [table_no, booker, phone, no_people, dining_start_time,dining_end];
    console.log(dining_start_time);
    rows.push(arr);
    let json_data = JSON.stringify(rows);
    localStorage.setItem("data", json_data);
    let arr1 = [table_no, booker, phone, no_people, dining_start_time_format,dining_end_format];
    let row = document.createElement("tr");
    for (let x = 0; x < 6; x++) {
        let data = document.createElement("td");
        let text = document.createTextNode(arr1[x]);
        data.appendChild(text);
        data.setAttribute("class", "td");
        row.appendChild(data);
    }
    let icon = document.createElement("td");
    icon.setAttribute("class", "td");
    icon.innerHTML = `
    <i class="fa-solid fa-pen" style=" margin-right: 10px; cursor: pointer;" onclick="edit_page(${extract.length})"  onmouseover="mouse_over_delete(this)" onmouseleave="mouse_leave_delete(this)"></i>
    <i class="fa-solid fa-trash" style="color: #000; cursor: pointer;" onclick="del_icon(${extract.length})"  onmouseover="mouse_over_edit(this)" onmouseleave="mouse_leave_edit(this)"></i>
`;
    row.appendChild(icon);
    table.appendChild(row);
    close_dialog();
}


window.onload = function () {
    let extract = JSON.parse(localStorage.getItem("data")) || [];
    rows = extract;
    console.log(rows);
    console.log(extract);
    let extract1 = JSON.parse(localStorage.getItem("data"))||[];
    if (extract.length) {
        let firstRow = document.getElementById("first");
        if (firstRow) {
            firstRow.remove();
        }
    }
    count = 0;
    for(let y=0;y<extract1.length;y++){
    let dining_start_time_format=new Date(extract1[y][4]);
    dining_start_time_format = dining_start_time_format.toLocaleDateString()+" "+dining_start_time_format.toLocaleTimeString();
    dining_end_format=new Date(extract1[y][5]);
    dining_end_format = dining_end_format.toLocaleDateString()+" "+dining_end_format.toLocaleTimeString();
    extract1[y][4]=dining_start_time_format;
    extract1[y][5]=dining_end_format;
    }
    for (let y = 0; y < extract1.length; y++) {
        let row = document.createElement("tr");
        for (let x = 0; x < 6; x++) {
            let data = document.createElement("td");
            let text = document.createTextNode(extract1[y][x]);
            data.appendChild(text);
            data.setAttribute("class", "td");
            row.appendChild(data);
        }
        let icon = document.createElement("td");
        icon.setAttribute("class", "td");
        icon.innerHTML = `
            <i id=icon1${y} class="fa-solid fa-pen" style="margin-right: 10px; cursor: pointer;" onclick="edit_page(${y})" onmouseover="mouse_over_delete(this)" onmouseleave="mouse_leave_delete(this)" ></i>
            <i class="fa-solid fa-trash" style="color: #000; cursor: pointer;" onclick="del_icon(${y})"  onmouseover="mouse_over_edit(this)" onmouseleave="mouse_leave_edit(this)"></i>
        `;
        row.appendChild(icon);
        table.appendChild(row);
    }
    console.log(rows);
    console.log(extract);
}

function mouse_leave_edit(obj){
    obj.style.color="black";
}
function mouse_over_delete(obj){
    obj.style.color="greenyellow";
}
function mouse_leave_delete(obj){
    obj.style.color="black";
}
function del_icon(index) {
    let extract = JSON.parse(localStorage.getItem("data"))||[];
    let diningStartTime = new Date(extract[index][4]);
    let diningEndTime = new Date(extract[index][5]);
    let now = new Date();

    if (now >= diningStartTime && now<=diningEndTime) {
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

function reset1(){
    document.getElementById("table_no").value = "";
    document.getElementById("booker_name").value = "";
    document.getElementById("phone_no").value = "";
    document.getElementById("no_people").value = "";
    document.getElementById("dining_end").value = "";
    document.getElementById("dining_start").value = "";
}

function edit_reset(){
    document.getElementById("booker_name").value = "";
    document.getElementById("phone_no").value = "";
    document.getElementById("no_people").value = "";
    document.getElementById("dining_end").value = "";
    document.getElementById("dining_start").value = "";
}

function edit_page(index) {
    let extract = JSON.parse(localStorage.getItem("data"));
    let diningStartTime = new Date(extract[index][4]);
    let diningEndTime = new Date(extract[index][5]);
    let now = new Date();
    if (now >= diningStartTime && now<=diningEndTime) {
        alert("Cannot edit this record. Dining has already started!");
        return;
    }
    document.getElementById("add_label").innerHTML = "Edit";
    let table_no_edit = document.getElementById("table_no");
    table_no_edit.setAttribute("disabled","true");
    let booker_edit = document.getElementById("booker_name");
    let phone_edit = document.getElementById("phone_no");
    let no_people_edit = document.getElementById("no_people");
    let dining_end_edit = document.getElementById("dining_end");
    let dining_start_time_edit = document.getElementById("dining_start");
    let arr1 = [table_no_edit, booker_edit, phone_edit, no_people_edit, dining_start_time_edit, dining_end_edit];
    let save_btn = document.getElementById("save-btn");
    save_btn.setAttribute("onclick", `edit_save(${index},event)`);
    let reset_btn = document.getElementById("reset-btn");
    reset_btn.setAttribute("onclick", `edit_reset()`);
    for (let x = 0; x < 6; x++) {
        arr1[x].value = extract[index][x];
    }
    dialog_box.showModal();
    dialog_box.style.display = "flex";
    content.style.filter = "blur(2px)";
}



function edit_save(index,event) {
    event.preventDefault();
    let extract = JSON.parse(localStorage.getItem("data")) || [];
    const form = document.getElementById('form');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    let edit_table_no_value = document.getElementById("table_no").value;
    let edit_booker_value = document.getElementById("booker_name").value;
    let edit_phone_value = document.getElementById("phone_no").value;
    let edit_no_people_value = document.getElementById("no_people").value;
    let edit_dining_start_value = document.getElementById("dining_start").value;
    let edit_dinind_end_value = document.getElementById("dining_end").value;
    let today = new Date();
    let diningStartTime = new Date(edit_dining_start_value);
    if(diningStartTime<today){
        alert("You can book today onwards only");
        return;
    }
    if(edit_dining_start_value == edit_dinind_end_value){
        alert("The start and end dates can not be same!");
        return;
    }
    for (let x = 0; x < extract.length; x++) {
        if ( edit_table_no_value == extract[x][0] && (edit_dining_start_value <= extract[x][5] || edit_dinind_end_value  <= extract[x][5])) {
            alert("The table is already booked at this time! Try for next possible time");
            return;
        }
    }
    let edit_arr_value = [edit_table_no_value, edit_booker_value, edit_phone_value, edit_no_people_value, edit_dining_start_value, edit_dinind_end_value];
    for (let x = 0; x < 6; x++) {
        extract[index][x] = edit_arr_value[x];
    }
    rows = extract;
    localStorage.setItem("data", JSON.stringify(rows));
    location.reload();
}

function del_record(){
    let extract = JSON.parse(localStorage.getItem("data")) || [];
    const now = new Date();
    let extract1 = extract.filter(filter_func);
    function filter_func(record){
        const diningEndTime = new Date(record[5]);
        return diningEndTime > now;
    };
    localStorage.setItem("data", JSON.stringify(extract1));
    rows = extract1;
    if(extract1.length<extract.length){
        location.reload();
    }
}
setInterval(del_record,1000);