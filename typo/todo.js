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

function paintTodo(todoItem){
    const li = document.createElement('li');
    const span = document.createElement('span');
    const button_clear = document.createElement('button');
    const button_rm = document.createElement('button');

    span.classList.add('li_span');
    li.id = todoItem.id;

    button_clear.addEventListener('click', (event) => {
        const target_li = event.target.parentElement;
        const target_span = target_li.querySelector('span');
        console.log(target_span);
        target_span.classList.toggle('active');
    });

    button_rm.addEventListener('click', (event) => {
        const target_li = event.target.parentElement;
        target_li.remove();
        todoArr = todoArr.filter(function(item){
            return item.id !== parseInt(target_li.id);
        });
        saveTodo();
    });

    button_clear.innerText = '📃';
    button_rm.innerText = 'backspace';
    span.innerText = todoItem.text;

    button_clear.id = 'clear';
    button_rm.id = 'rm';
    button_rm.classList.add("material-icons");

    li.appendChild(button_clear);
    li.appendChild(button_rm);
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
