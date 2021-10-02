import { getLocalStorage, setLocalStorage } from "./localStorage.js";
import { renderTasks } from "./renderTasks.js";

const boxs = document.querySelectorAll(".box-task");

boxs.forEach(box => {
  interact(box).dropzone({
    accept: '.task',
    checker: function (
      dragEvent, 
      event,             
      dropped,           
      dropzone,          
      dropzoneElement,   
      draggable,         
      draggableElement   
    ) {

      if(dragEvent.type === "dragend" && dropped) {
        dropzoneElement.parentElement.style.borderColor = "white";

        if(dropzone.target.id === "to-do") {
          changeStatusOfTask(draggable, 1);
        } else if(dropzone.target.id === "in-progress"){
          changeStatusOfTask(draggable, 2);
        } else if (dropzone.target.id === "done") {
          changeStatusOfTask(draggable, 3);
        }
      }

      if(dragEvent.type === "dragmove" && dropped) {
        dropzoneElement.parentElement.style.borderColor = "#7952B3";
      }

      if(dragEvent.type === "dragmove" && !dropped) {
        dropzoneElement.parentElement.style.borderColor = "white";
      } 
    }
  });
});

function changeStatusOfTask(draggable, status) {
  const arrayTasks = getLocalStorage();
  const indexElement = draggable.target.attributes[1].value;
  const task = arrayTasks.find(task => task.id == indexElement);

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

export function addEventsToTaskBox(card) {
  interact(card).styleCursor(false).draggable({
    onstart: function (e) {
      e.currentTarget.style.position = "absolute";
    },
    onmove : function (e) {
      e.currentTarget.style.top = (e.pageY - 90) + 'px';
      e.currentTarget.style.left = (e.pageX - 145) + 'px';
      e.currentTarget.style.cursor = "grabbing";
    }, 
    onend  : function (e) {
      e.currentTarget.style.position = "static";
    },
  });
}