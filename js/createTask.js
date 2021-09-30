import { setLocalStorage, getLocalStorage } from "./localStorage.js";
import { openCloseModal } from "./modal.js";
import { getTasksOfLocalStorage } from "./renderTasks.js";

let arrayTasks = [];

export function taskObject(dateCreated, dateFinish, description) {
  arrayTasks = [];
  
  const dateFormated = formatDate(dateFinish);

  const dataLocalStorage = getLocalStorage();

  if(dataLocalStorage) {
    arrayTasks = dataLocalStorage;
  }


  const task = {
    id: createId(),
    status: 1,
    dateCreated,
    dateFinish: dateFormated,
    description
  }

  arrayTasks.push(task);
  setLocalStorage(arrayTasks);
  getTasksOfLocalStorage();
  openCloseModal(false);
}

function formatDate(date) {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

function createId() {
  return Math.floor(Math.random() * 9000000000000 + 1);
}