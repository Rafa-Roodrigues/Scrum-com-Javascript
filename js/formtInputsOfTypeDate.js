const formTask = document.getElementById("form-create-task");
const dateCreatedTask = document.getElementById("date-created-task");
const dateFinishTask = document.getElementById("date-finish-task");

const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
const year = date.getFullYear();

if(month < 10) month = '0' + month;

if(day < 10) day = '0' + day;

const dateFormtBrazilian = `${day}/${month}/${year}`;
const dateFormtAmerican = `${year}-${month}-${day}`;

dateCreatedTask.value = dateFormtBrazilian;
dateFinishTask.setAttribute("min", dateFormtAmerican);

dateFinishTask.addEventListener("keydown", (e) => {
  e.preventDefault();
})