// import '@fortawesome/fontawesome-free/js/all.js';

let taskList = [];

export const addNewTask = (description) => {
  const task = {};
  task.description = description;
  task.completed = false;
  if (taskList !== null) {
    task.index = taskList.length + 1;
  } else {
    task.index = 1;
  }
  taskList.push(task);
  localStorage.setItem('todolist', JSON.stringify(taskList));
};

export function deleteTask(index) {
  const newList = taskList.filter((a) => {
    if (a.index !== index) {
      if (a.index > index) { a.index -= 1; } return a;
    }
    return false;
  });
  taskList = newList;
  localStorage.setItem('todolist', JSON.stringify(taskList));
}

export const editTask = (description, index) => {
  const newList = taskList.filter((a) => {
    if (a.index === index) { a.description = description; return a; }
    return a;
  });
  taskList = newList;
  localStorage.setItem('todolist', JSON.stringify(taskList));
};

export function displayTaskList() {
  if (localStorage.getItem('todolist') !== null) {
    const newList = JSON.parse(localStorage.getItem('todolist') || []);
    taskList = newList;
    taskList = taskList.filter((a) => {
      if (a.completed !== true) { return a; }
      return 0;
    });
  }
}

export const itemList = () => {
  const itemdiv = document.createElement('div');
  itemdiv.id = 'item-list';
  displayTaskList();
  taskList.forEach((task) => {
    const div = document.createElement('div');
    const checkbox = document.createElement('input');
    const label = document.createElement('span');
    const refresh = document.createElement('div');
    const remove = document.createElement('i');
    div.classList.add('clear', 'todo', 'task-color-white');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    checkbox.name = task.index;
    div.appendChild(checkbox);
    label.classList.add('desription');
    label.innerText = `${task.description}`;
    label.name = task.index;
    div.appendChild(label);
    refresh.classList.add('refresh');
    remove.classList.add('fas', 'fa-ellipsis-v');
    refresh.name = task.index;
    refresh.appendChild(remove);
    div.appendChild(refresh);
    itemdiv.appendChild(div);
  });
  return itemdiv;
};

export const completeTask = (index) => {
  const newList = taskList.filter((a) => {
    if (a.index === index) { a.completed = true; return a; }
    return a;
  });
  taskList = newList;
  localStorage.setItem('todolist', JSON.stringify(taskList));
};
