

//when user enters a task then task is added to the local storage
let addbtn = document.getElementById("addbtn");
addbtn.addEventListener("click", function () {
    let notes = sessionStorage.getItem("notes");
    if (notes === null) {
        notes_arr = [];
    }
    else {
        notes_arr = JSON.parse(notes);
    }
    notes_arr.push(document.getElementById("addtxt").value);
    sessionStorage.setItem("notes", JSON.stringify(notes_arr));
    document.getElementById("addtxt").value = "";

    console.log(notes_arr);
});
addbtn.addEventListener("click", function () {
    let dates = sessionStorage.getItem("dates");
    if (dates === null) {
        dates_arr = [];
    }
    else {
        dates_arr = JSON.parse(dates);
    }
    dates_arr.push(document.getElementById("deadline").value);
    sessionStorage.setItem("dates", JSON.stringify(dates_arr));
    document.getElementById("deadline").value = "";

    console.log(dates_arr);
});

//display an added note
let html = ``;
// call the notes and the dates from the local Storage
// then parse them into the array format
// traverse on the notes array 
// create a card on the view task section and then display the note and the deadline on the task setup
let notes = JSON.parse(sessionStorage.getItem("notes"));
let dates = JSON.parse(sessionStorage.getItem("dates"));

for (let i = 0; i < notes.length; i++) {
    // let card = document.getElementById("showCard");
    let text = notes[i];
    let dead = dates[i];
    console.log(text, dead);
    // arr.push(card);

    html += `
            <div class="card taskcard mx-2 my-2" style="width: 18rem;" id="showCard_${i}">
            <div class="card-body">
                <h5 class="card-title">Task ${i + 1}</h5>
                <p class="card-text">${text}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">deadline: ${dead}</li>
            </ul>
            <div class="card-body">
                <button class="btn btn-primary" id="${i}" onclick=delete_task(this.id)>Delete Task</button>
            </div>
            </div>`;
}



document.getElementById("tasks").innerHTML = html;

function delete_task(id) {
    document.getElementById("showCard_" + id).remove();

    let notes = JSON.parse(sessionStorage.getItem("notes"));
    let dates = JSON.parse(sessionStorage.getItem("dates"));

    notes.splice(id,1);
    dates.splice(id,1);

    sessionStorage.setItem("notes", JSON.stringify(notes));
    sessionStorage.setItem("dates", JSON.stringify(dates));
    location.reload();

}

notes = JSON.parse(sessionStorage.getItem("notes"));
if(notes.length===0)
{
    document.getElementById("tasks").innerText=`NO TASKS TO SHOW!! USE "ADD YOUR TASK HERE TO ADD NOW"`;
}

let find=document.getElementById("search");
find.addEventListener("input",function(){
    let findtxt= find.value;
    let cards=document.getElementsByClassName("taskcard");
    Array.from(cards).forEach(function(i){
        let cardtxt=i.getElementsByTagName("p")[0].innerText;
        // let carddate=i.getElementsByTagName("li");

        if(cardtxt.includes(findtxt))
        {
            i.style.display="block";
        }
        else
        {
            i.style.display="none";
        }
    })
});
