let add = document.getElementById("add");
let sort = document.getElementById("sort");
let dialog_box = document.getElementById("dialog_box");
let dialog_box_edit =document.getElementById("dialog_box_edit")
let content = document.getElementById("content");
let table = document.getElementById("table");
let first = table.childNodes;
let table_no;
let booker;
let phone;
let no_people;
let dining_end;
let dining_start_time;
function style_change_add() {
    add.style.backgroundColor = "rgba(255,160,122,0.6)";
    add.style.borderColor = "white";
    dialog_box.showModal();
    dialog_box.style.display = "flex";
    content.style.filter = "blur(2px)";
}
function style_change_sort() {
    sort.style.backgroundColor = "rgba(240,230,140,0.6)";
    sort.style.borderColor = "white";
}
function style_change1_add() {
    add.style.backgroundColor = "rgb(255,160,122)";
    add.style.borderColor = "black";
}
function style_change1_sort() {
    sort.style.backgroundColor = "rgb(240,230,140)";
    sort.style.borderColor = "black";
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
function edit_page(){
    dialog_box_edit.showModal();
    dialog_box_edit.style.display = "flex";
    content.style.filter = "blur(2px)";
}
function close_dialog_edit() {
    dialog_box_edit.close();
    dialog_box_edit.style.display = "none";
    content.style.filter = "blur(0)";
}
console.log(typeof first);
for(let [x,y] of Object.entries(first)){
   console.log(x);
   console.log(y);
}
console.log(first["1"]);
console.log(typeof first["1"]["rows"]);
for(let x of Object.values(first["1"]["rows"])){
    console.log(typeof x+" "+x);
}
function save(){
    table_no = document.getElementById("table_no").value;
    booker = document.getElementById("booker_name").value;
    phone= document.getElementById("phone_no").value;
    no_people = document.getElementById("no_people").value;
    dining_end = document.getElementById("dining_end").value;
    dining_start_time = document.getElementById("dining_start").value;
    console.log(table_no);
    console.log(booker);
    console.log(phone);
    console.log(no_people);
    console.log(dining_end);
    console.log(dining_start_time);
    console.log(first["1"]["1"]);
    //document.getElementById("table").removeChild(first["1"]);
}