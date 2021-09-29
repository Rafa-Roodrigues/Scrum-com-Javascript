import { getLocalStorage } from "./localStorage.js";
import { addEventsToTaskBox } from './moveCard.js';

const toDo = document.getElementById("to-do");
const inProgress = document.getElementById("in-progress");
const done = document.getElementById("done");

export function getTasksOfLocalStorage() {
  const data = getLocalStorage();

  if(!data) return;

  renderTasks(data);
}

function createCardTask(task) {
  // CRIANDO OS ELEMENTOS HTML
  const container = document.createElement("div");
  const boxDate = document.createElement("div");
  const boxInfo = document.createElement("div");
  const div = document.createElement("div");
  const spanDateCreated = document.createElement("span");
  const spanDateFinish  = document.createElement("span");
  const p = document.createElement("p");
  const img = document.createElement("img");

  // ATRIBUINDO VALORES AOS ELEMENTOS CRIADOS
  spanDateCreated.innerText = task.dateCreated;
  spanDateFinish.innerText = task.dateFinish;
  p.innerText = task.description;
  img.src = "../img/delete.svg";

  // ATRIBUINDO CLASSES AOS ELEMENTOS CRIADOS
  container.classList.add("task");
  boxDate.classList.add("box-date");
  boxInfo.classList.add("box-info");

  // COLOCANDO OS ELEMENTOS DENTRO DE SEUS PAIS
  boxDate.appendChild(spanDateCreated);
  boxDate.appendChild(spanDateFinish);
  boxInfo.appendChild(p);
  div.appendChild(img);
  container.appendChild(boxDate);
  container.appendChild(boxInfo);
  container.appendChild(div);

  addEventsToTaskBox(container, task.id);
  
  // RETORNANDO O CARD DA TAREFA COM TODA A SUA ESTRUTURA E VALORES
  return container;
}

function clearDivs() {
  toDo.innerHTML = "";
  inProgress.innerHTML = "";
  done.innerHTML = "";
}

export function renderTasks(data) {
  clearDivs();

  data.map(task => {
    if(task.status === 1) {
      toDo.appendChild(createCardTask(task));
    } else if(task.status === 2) {
      inProgress.appendChild(createCardTask(task));
    } else {
      done.appendChild(createCardTask(task));
    }
  });
}

window.addEventListener("load", () => getTasksOfLocalStorage());