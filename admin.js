let local_data = JSON.parse(localStorage.getItem("data"));

if(local_data.length>0){
    for(let x=0;x<local_data.length;x++){
            let table_con_div = document.getElementById("table_container");
            let table_div = document.createElement("div");
            table_div.setAttribute("id","table_div");
            table_div.innerHTML=`
                <img id="div_img" src="img/new7.jpg" alt="table">
                <p>table no:${local_data[x][0]}<p/>
                <p>Booked by:${local_data[x][1]}<p/>
                <p>Amount:Rs ${(local_data[x][3])*1450}/-<p/>
            `;
            table_con_div.appendChild(table_div);
    }
}
let dialog = document.getElementById("table_dialog");
let content =document.getElementById("content_page");
function add_table(){
    dialog.showModal();
    dialog.style.display = "flex";
    content.style.filter = "blur(2px)";
}
function close_dialog() {
    dialog.close();
    dialog.style.display = "none";
    content.style.filter = "blur(0)";
}