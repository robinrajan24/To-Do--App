const todoValue=document.getElementById('todoText')
const todoAlert=document.getElementById('Alert')
const listItems=document.getElementById('list-items')
const addUpdate=document.getElementById('AddupdateClick')

let todo=JSON.parse(localStorage.getItem('todo-list'));
if(!todo){
    todo=[]
}


function CreateTodoItems(){
    if(todoValue.value===''){
        todoAlert.innerHTML='Please enter your todo text'
        todoValue.focus()
    }
    else{
      
        let isPresent=false;
         // if the array value and entered value are same then show msg already added
        todo.forEach((ele)=>{
            if(ele.item==todoValue.value){
                isPresent-true
            }
        })

        if(isPresent){
            setAlertMessage(
                "This item already present in the list"
            )

        }
// adding to list 
        let li=document.createElement("li")
        const todoItems=`<div title="Hit Double Click and Complete"ondblcclick="CompleteToDoItems(this)">
        ${todoValue.value}
        </div>
        <div>
        <img class="edit todo-controls" occlick="UpdateToDoItems(this)" src="/images/pencil.png">

         <img class="delete todo-controls" occlick="DeleteToDoItems(this)" src="/images/trash-bin.png">
        
        </div>
`;
         li.innerHTML=todoItems;
         listItems.appendChild(li)


         if(!todo){
            todo=[]
        }

        let itemList={item:todoValue.value,status:false}
        todo.push(itemList)
        console.log(todo,"todo")
        setLocalStorage()



        

    }

    todoValue.value='';
        setAlertMessage("Todo item Created Successfully")

   

}

function setLocalStorage(){
    localStorage.setItem("todo-list",JSON.stringify(todo))
}






  