const formCreateTask = document.getElementById("form-create-task");
const dateCreatedTask = document.getElementById("date-created-task");
const dateFinishTask = document.getElementById("date-finish-task");
const descriptionTask = document.getElementById("description-task");

dateFinishTask.addEventListener("blur", () => validateInputEmpty(dateFinishTask));
descriptionTask.addEventListener("blur", () => {
  let error = validateInputEmpty(descriptionTask);

  if(!error) {
    validateQuantityOfCaraterOfInput(descriptionTask);
  }
});

// EXIBIR A CAIXA DE ERRO
function showErrorBox(parent, input, mensagem) {
  input.style.borderColor = "#FF2626";
  const boxError = createBoxOfError(mensagem);
  parent.appendChild(boxError);
}

// REMOVER A CAIXA DE ERROR
function removeErrorBox(parent) {
  parent.removeChild(parent.children[2]);
}

// VERIFICAR SE A QUANTIDADE DE CARACTERES DA INPUT
function validateQuantityOfCaraterOfInput(input) {
  const parent = input.parentNode;
  let error = false;

  if(input.value.length < 11) {
    const messageError = "Este campo precisa ter mais de 10 caracteres."
    const errorBoxAlreadyExists = checkIfExistsErrorBox(parent);
    
    if(!errorBoxAlreadyExists) {
      showErrorBox(parent, input, messageError);
      error = true;
    }
  }

  return error;
}

// VERIFICAR SE A INPUT ESTA VAZIA
function validateInputEmpty(input) {
  const parent = input.parentNode;
  let error = false;

  if(input.value == "") {
    const messageError = "Este campo é obrigatório."
    const errorBoxAlreadyExists = checkIfExistsErrorBox(parent);
    
    if(!errorBoxAlreadyExists) {
      showErrorBox(parent, input, messageError);
      error = true;
    }

  } else {
    const verifyIfExistsErrorBox = checkIfExistsErrorBox(parent);
    if(verifyIfExistsErrorBox) {
      removeErrorBox(parent);
      input.style.borderColor = "#FFFFFF";
    }
  }

  return error;
}

// VERIFICAR SE EXISTE A CAIXA DE ERRO
function checkIfExistsErrorBox(parent) {
  if(parent.children.length < 3)
    return false;
  else 
    return true;
}

// CRIAR A CAIXA DE ERRO
function createBoxOfError(mensagem) {
  const div = document.createElement("div");
  const span = document.createElement("span");
  const p = document.createElement("p");

  div.classList.add("box-error");

  p.innerText = mensagem;

  div.appendChild(span);
  div.appendChild(p)
  
  return div;
}

function validateForm() {
  const inputs = document.getElementsByName("data");
  let error = false;

  for(let input of inputs) {
    let response = validateInputEmpty(input);

    if(response) {
      error = true;
    } else {

      if(input.id == "description-task") {
        let response = validateQuantityOfCaraterOfInput(input);

        if(response) {
          error = true;
        }
      }

    }

  }

  if(error) return;

  console.log("SO CHAMAR A FUNÇÃO DE CRIAR A TAREFA E SER FELIZ...");
}

formCreateTask.addEventListener("submit", (e) => {
  e.preventDefault();
  validateForm();
})