function openFeature() {
  let allElems = document.querySelectorAll(".elem");
  let allfullElems = document.querySelectorAll(".fullElem");
  let backButton = document.querySelectorAll(".fullElem .back");
  allElems.forEach(function (elem) {
    elem.addEventListener("click", function () {
      allfullElems[elem.id].style.display = "block";
    });
  });

  backButton.forEach(function (back) {
    back.addEventListener("click", function () {
      allfullElems[back.id].style.display = "none";
    });
  });
}

openFeature();

function todoList() {
  let currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("Task is empty");
  }

  function renderTask() {
    let allTask = document.querySelector(".all-task");

    let sum = "";

    currentTask.forEach(function (elem, idx) {
      sum =
        sum +
        ` <div class="task">
              <h5>${elem.task} <span class=${elem.imp} >imp</span></h5>

              <button id=${idx}>Mark as completed</button>
            </div>`;
            // console.log(task);
            
    });

    allTask.innerHTML = sum;

    localStorage.setItem("currentTask", JSON.stringify(currentTask));

     let markCompletedBtn = document.querySelectorAll(".task button");

  markCompletedBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
      currentTask.splice(btn.id, 1);
      renderTask();
      
    });
  });
  }

  renderTask();

  let form = document.querySelector(".add-task form");
  let taskInput = document.querySelector(".add-task form #task-input");
  let taskDetails = document.querySelector(".add-task form textarea");
  let taskCheckbox = document.querySelector(" #check");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    currentTask.push({
      task: taskInput.value,
      details: taskDetails.value,
      imp: taskCheckbox.checked,
    });
    renderTask();
    taskInput.value = '';
    taskDetails.value = '';
    taskCheckbox.checked = false
   
  });
 
}

todoList()

function dailyPlaner(){
  let dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {}

let dayPlanner = document.querySelector('.day-planner')



let hours = Array.from({length:18},(_,idx)=>`${6+idx}:00 - ${7+idx}:00`)

let wholeDaySum = ''

hours.forEach(function(elem,idx){
  let savedData = dayPlanData[idx] || ''
  wholeDaySum = wholeDaySum + `<div class="day-planner-time">
            <p>${elem}</p>
            <input id=${idx} type="text" placeholder="..."  value=${savedData}>
          </div>`
}) 





dayPlanner.innerHTML = wholeDaySum;

let dayPlannerInput = document.querySelectorAll('.day-planner input')

dayPlannerInput.forEach(function(elem){
  elem.addEventListener('input',function(){
    dayPlanData[elem.id] = elem.value

    localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData))
  
  })
})
}

dailyPlaner()