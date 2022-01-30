const todoForm = document.querySelector("#todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector("#todo");
const STORAGE_KEY = "todos";

let todoArr = [];

function saveTodo(){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todoArr));
}

function loadTodo(){
    const loadedStr = localStorage.getItem(STORAGE_KEY);
    if(loadedStr !== null){
        todoArr = JSON.parse(loadedStr);
        todoArr.forEach(paintTodo);
    }
}

function removeTodo(event){
    const target_li = event.target.parentElement;
    target_li.remove();
    todoArr = todoArr.filter(function(item){
        return item.id !== parseInt(target_li.id);
    });
    saveTodo();
}

function paintTodo(todoItem){
    const li = document.createElement('li');
    const span = document.createElement('span');
    const button = document.createElement('button');

    span.classList.add('li_span');
    li.id = todoItem.id;

    button.addEventListener('click', removeTodo);

    button.innerText = '📃'
    span.innerText = todoItem.text;

    li.appendChild(button);
    li.appendChild(span);
    todoList.appendChild(li);
}

todoForm.addEventListener('submit', function(event){
    event.preventDefault();

    const newTodo = todoInput.value;
    const newTodoObj = {
        text: newTodo,
        id: Date.now()
    };
    todoArr.push(newTodoObj);
    saveTodo();
    paintTodo(newTodoObj);

    todoInput.value = '';
});

loadTodo();
