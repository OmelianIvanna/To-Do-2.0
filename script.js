const input = document.getElementById('taskInput');
const list = document.getElementById('taskList');

let currentFilter = 'all';

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask() { 
    if (input.value.trim() ==="") return; 

    tasks.push({text: input.value, done: false});
    localStorage.setItem('tasks', JSON.stringify(tasks));
    input.value = "";
    renderTasks();
}

function setFilter(filter) {
    currentFilter = filter;

const buttons = document.querySelectorAll('.filter-btn');

buttons.forEach(function(btn) {
    btn.classList.remove('active');
});

if (filter === 'all') buttons[0].classList.add('active');
if (filter === 'active') buttons[1].classList.add('active');
if (filter === 'completed') buttons[2].classList.add('active');

    renderTasks();
}

function renderTasks() {
    list.innerHTML = "";

    if (tasks.length === 0) {
    list.innerHTML = '<li class="empty">No tasks added yet :)</li>';
    return
}

    tasks.forEach(function(task, index) {
        if (currentFilter === 'active' && task.done) return;
        if (currentFilter === 'completed' && !task.done) return;
        const li= document.createElement('li');
        const btn = document.createElement('button');
        btn.textContent = 'delete';
        const editBtn = document.createElement('button');
        editBtn.textContent = 'edit';
        editBtn.onclick = function() {
            const newText = prompt('Edit task:', task.text);
            if (newText.trim() === '') return;
            tasks[index].text = newText;
            localStorage.setItem('tasks', JSON.stringify(tasks));
       renderTasks();
        };

        btn.onclick = function(){
            tasks = tasks.filter(function(_, i) {
                return i !== index;
            })
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        };

        const checkbox = document.createElement('input');
        checkbox.checked = task.done;
        checkbox.onchange = function() {
            tasks[index].done =!tasks[index].done;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
        checkbox.type = 'checkbox';
        const span = document.createElement('span');
        span.textContent = task.text;
        if (task.done) {
            span.style.textDecoration = 'line-through';
        } 
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(btn);
        list.appendChild(li);
    });
}

input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
    
});
renderTasks();
setFilter('all');