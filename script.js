const todoValue = document.getElementById("todoText");
const todoAlert = document.getElementById("Alert");
const listItems = document.getElementById("list-items");
const addUpdate = document.getElementById("AddupdateClick");

let todo = JSON.parse(localStorage.getItem("todo-list"));
if (!todo) {
  todo = [];
}

// Creating task
function CreateTodoItems() {
  if (todoValue.value === "") {
    todoAlert.innerHTML = "Please enter your todo text";
    todoValue.focus();
  } else {
    let isPresent = false;
    // if the array value and entered value are same then show msg already added
    todo.forEach((ele) => {
      if (ele.item == todoValue.value) {
        isPresent - true;
      }
    });

    if (isPresent) {
      setAlertMessage("This item already present in the list");
    }
    // adding to list
    let li = document.createElement("li");
    const todoItems = `<div title="Hit Double Click and Complete"ondblcclick="CompleteToDoItems(this)">
        ${todoValue.value}
        </div>
        <div>
        <img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="/images/pencil.png">

         <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="/images/trash-bin.png">
        
        </div>
`;
    li.innerHTML = todoItems;
    listItems.appendChild(li);

    if (!todo) {
      todo = [];
    }

    let itemList = { item: todoValue.value, status: false };
    todo.push(itemList);
    console.log(todo, "todo");
    setLocalStorage();
  }

  todoValue.value = "";
  setAlertMessage("Todo item Created Successfully");
}

function setLocalStorage() {
  localStorage.setItem("todo-list", JSON.stringify(todo));
}

// Reading Task

function ReadToDoItems() {
  todo.forEach((ele) => {
    console.log(ele, "read todo");
    let li = document.createElement("li");
    let style = "";

    if (ele.status) {
      style = "style='text-decoration:line-through'";
    }

    const todoItems = `
        <div ${style} title="Hit Double Click and Complete"ondblclick="CompleteToDoItems(this)">
        ${ele.item}
        ${
          style === ""
            ? ""
            : '<img class="todo-controls" src="/images/check.png">'
        }
        
        </div>
        
        <div>

         ${
           style === ""
             ? '<img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="/images/pencil.png">'
             : ""
         }

        <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="/images/trash-bin.png">

    
        
       
        
        </div>`;

    li.innerHTML = todoItems;
    listItems.appendChild(li);
  });
}

ReadToDoItems();
// edit todo
function UpdateToDoItems(e) {
  console.log(e, "ele");
  if (
    e.parentElement.parentElement.querySelector("div").style.textDecoration ===
    ""
  ) {
    todoValue.value =
      e.parentElement.parentElement.querySelector("div").innerText;
    updateText = e.parentElement.parentElement.querySelector("div");
    addUpdate.setAttribute("onclick", "UpdateOnSelectedItems()");
    addUpdate.setAttribute("src", "/images/loading.gif");
    todoValue.focus();
  }
}

// edit and update todo
function UpdateOnSelectedItems() {
  let isPresent = false;
  todo.forEach((ele) => {
    if (ele.item == todoValue.value) {
      isPresent = true;
    }
  });

  if (isPresent) {
    console.log("value already added");
    setAlertMessage("This item is already present in the list");
    return;
  }
  todo.forEach((ele) => {
    if (ele.item == updateText.innerHTML.trim()) {
      ele.item = todoValue.value;
    }
  });

  setLocalStorage();
  updateText.innerHTML = todoValue.value;
  addUpdate.setAttribute("onclick", "CreateTodoItems()");
  addUpdate.setAttribute("src", "/images/plus.png");
  todoValue.value = "";
  setAlertMessage("Todo item Updated Successfully");
}

// delete todo
function DeleteToDoItems(e) {
  console.log(e);
  let deleteValue =
    e.parentElement.parentElement.querySelector("div").innerText;

  if (confirm(`Are you sure. Due you want to delete this ${deleteValue}!`)) {
    e.parentElement.parentElement.setAttribute("class", "deleted-item");
    todoValue.focus();

    // Find the index of the item to be deleted
    const indexToDelete = todo.findIndex(
      (ele) => ele.item.trim() === deleteValue
    );

    // Remove the item from the array if found
    if (indexToDelete !== -1) {
      todo.splice(indexToDelete, 1);
    }

    setTimeout(() => {
      e.parentElement.parentElement.remove();
    }, 1000);

    setLocalStorage();
  }
}

// Complete todo
function CompleteToDoItems(e) {
  console.log(e);
  if (e.parentElement.querySelector("div").style.textDecoration === "") {
    const img = document.createElement("img");
    img.src = "/images/check.png";
    img.className = "todo-controls";

    e.parentElement.querySelector("div").style.textDecoration = "line-through";

    e.parentElement.querySelector("div").appendChild(img);
    e.parentElement.querySelector("img.edit").remove();

    todo.forEach((ele) => {
      if (e.parentElement.querySelector("div").innerText.trim() == ele.item) {
        ele.status = true;
      }
    });

    setLocalStorage();
    setAlertMessage("Todo item Completed Successfully");
  }
}

// Alert Message
function setAlertMessage(message) {
  todoAlert.removeAttribute("class");
  todoAlert.innerText = message;
  setTimeout(() => {
    todoAlert.classList.add("toggleMe");
  }, 1000);
}
