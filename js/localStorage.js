export function setLocalStorage(data) {
  localStorage.setItem('@TASKS', JSON.stringify(data));
}

export function getLocalStorage() {
  return JSON.parse(localStorage.getItem('@TASKS'));
}