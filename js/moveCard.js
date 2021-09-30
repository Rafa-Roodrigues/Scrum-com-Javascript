import { getLocalStorage, setLocalStorage } from "./localStorage.js";
import { renderTasks } from "./renderTasks.js";

const toDo = document.getElementById("to-do");
const inProgress = document.getElementById("in-progress");
const done = document.getElementById("done");

let evento = false;
let cardId;

toDo.addEventListener("mouseover", () => {
  if(evento) {
    evento = false;
    moveTask(cardId, 1);
  }
});

inProgress.addEventListener("mouseover", () => {
  if(evento) {
    evento = false;
    moveTask(cardId, 2);
  }
});

done.addEventListener("mouseover", () => {
  if(evento) {
    evento = false;
    moveTask(cardId, 3);
  }
});

function moveTask(id, status) {
  const arrayTasks = getLocalStorage();

  const task = arrayTasks.find(task => task.id === id);

  const index = arrayTasks.indexOf(task);

  arrayTasks.splice(index, 1);

  const newTask = {
    ...task,
    status
  }

  arrayTasks.push(newTask);
  setLocalStorage(arrayTasks);
  renderTasks(arrayTasks);
}

export function addEventsToTaskBox(card, id) {

  card.onmousedown = () => {
    card.style.cursor = "grabbing";
    card.style.position = "absolute";
    cardId = id;
  }

  card.onmousemove = (e) => {
    card.style.left = (e.pageX - 150) + "px";
    card.style.top = (e.pageY - 80) + "px";
  }

  card.addEventListener("dblclick", () => {
    evento = false;
  })

  card.onmouseup = () => {
    card.style.cursor = "grab";
    card.style.position = "static";
    evento = true;
  }

  card.onmouseover = () => {
    card.style.cursor = "grab";
  }

  card.addEventListener("touchstart", () => {
    card.style.cursor = "grabbing";
    card.style.position = "absolute";
    cardId = id;
  })

  card.addEventListener("touchmove", (e) => {
    card.style.left = (e.pageX - 150) + "px";
    card.style.top = (e.pageY - 80) + "px";
  })

  card.addEventListener("touchleave", (e) => {
    card.style.cursor = "grab";
    card.style.position = "static";
    evento = true;
  })
}