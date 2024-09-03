let inputBar = document.querySelector("input")
let addBtn = document.querySelector("button")
let cont = document.querySelector(".cont")

//1) store new task in LS
//2) delete task in LS
//3) check for the task

let taskArray = [];                                  //create array

let olderTasks = localStorage.getItem("Tasks")

if (olderTasks) {
    let parsedArray = JSON.parse(olderTasks);
    taskArray = [...parsedArray];
    ticketAddertoUI(taskArray);
}

addBtn.addEventListener("click", function () {
    let value = inputBar.value;
    console.log(value)

    inputBar.value = "";
    if (value.length == 0) return;



    let taskobj = {
        id: Date.now(),
        task: value
    }

    taskArray.push(taskobj);                      //taskArray me push kar dege jab bhi koi new value milegi


    ticketAddertoUI(taskArray);                 //add the UI update


    localStorage.setItem("Tasks", JSON.stringify(taskArray));    //Add the local storage

});


ticketadderTextPart.addEventListener("keydown", function (event) {            //keybord ka event lisner laga ege kyu ki enter se yicket generate karne hai.
    if (event.key == "Enter") {                          //activate a Enter key
        let taskObj = {                                  //create a uniq id 
            task: ticketadderTextPart.value,
            color: taskColor,
            id: Date.now()
        }
        taskArray.push(taskObj);
        ticketadderTextPart.value = "";                  //textPare pe se text ko remove karne ke li or naya access karne ke liye

        localStorage.setItem("TaskManager", JSON.stringify(taskArray))           //add local storage


        ticketAdderfn(taskArray);                           //ticketAdderfn ko call karna 

        //ticketAdder.classList.toggle("noDisplay");           //ticketAdder ko hatane ke liye
        //or
        addBtn.click();                               //ticketAdder ko hatane ke liye
    }
})


function ticketAddertoUI(arr) {                //create a function and arr ko ui per store karna
    cont.innerHTML = "";                        //remove the old array
    arr.forEach(function (taskobj) {                 //use higher orde function

        let id = taskobj.id;

        let taskEle = document.createElement("div")
        taskEle.classList.add("task")
        taskEle.innerHTML = `<p>${taskobj.task}</p>
            <div class="edit"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="currentColor"><path d="M9.24264 18.9967H21V20.9967H3V16.754L12.8995 6.85453L17.1421 11.0972L9.24264 18.9967ZM14.3137 5.44032L16.435 3.319C16.8256 2.92848 17.4587 2.92848 17.8492 3.319L20.6777 6.14743C21.0682 6.53795 21.0682 7.17112 20.6777 7.56164L18.5563 9.68296L14.3137 5.44032Z"></path></svg></div>
            <div class="dlt"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="currentColor"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM9 11V17H11V11H9ZM13 11V17H15V11H13ZM9 4V6H15V4H9Z"></path></svg></div>
        </div>`

        let dltIcon = taskEle.querySelector(".dlt")
        dltIcon.addEventListener("click", function () {
            cont.removeChild(taskEle)                 //UI se delete

            let filteredTaskArray = taskArray.filter(function (taskobj) {
                return taskobj.id != id;
            })

            taskArray = filteredTaskArray;

            localStorage.setItem("Tasks", JSON.stringify(taskArray));    //Add the local storage


        });

        let editIcon = taskEle.querySelector(".edit")
        editIcon.addEventListener("click", function(){

            let filteredTaskArray = taskArray.filter(function(taskobj){
                return taskobj.id != id;
            })

            taskArray = filteredTaskArray;

            localStorage.setItem("Tasks", JSON.stringify(taskArray));    //Add the local storage

        })

        cont.appendChild(taskEle)

    });

}