/* eslint no-unsafe-optional-chaining: ["error", { "disallowArithmeticOperators": false }] */

import _ from 'lodash';
import './style.css';
import {
  addNewTask, deleteTask, editTask, displayTaskList, completeTask,
} from './todolist.js';
import mainList from './loadlist.js';

let newDescription = '';

function changeTaskDescription(a = '') {
  newDescription = a;
}

function getNewTaskDescription() {
  return newDescription;
}

function component() {
  const element = document.createElement('div');
  element.id = 'list-container';
  element.classList.add('active', 'complete');
  element.appendChild(mainList());
  return element;
}

document.body.appendChild(component());

const form = document.getElementById('new-task-form');
const addNewButton = document.querySelector('#submit-new-task');
const selectTask = document.querySelector('#item-list');
const taskDescripton = document.querySelectorAll('.desription');
const refreshList = document.querySelector('#list-head');

form.addEventListener('submit', () => {
  if (document.getElementById('newtask').value !== '') {
    addNewTask(form.elements.newtask.value);
  }
  displayTaskList();
});

// addNewButton.addEventListener('click', () => {
//   if (document.getElementById('newtask').value !== '') {
//     addNewTask(document.getElementById('newtask').value);
//   }
//   displayTaskList();
// });

selectTask.addEventListener('click', (e) => {
  if (e.target.classList.contains('fa-trash-can')) {
    const nod = e.target.parentNode;
    const div = nod.parentElement;
    deleteTask(parseInt(nod.name, 10));
    div.style.display = 'none';
  }
});

for (let i = 0; i < taskDescripton.length; i += 1) {
  taskDescripton[i].onclick = function () {
    const label = document.querySelector('.task-color-pink');
    const trashCan = document.querySelector('.fa-trash-can');
    const check = this.previousElementSibling;
    const nodeList = this.nextElementSibling.childNodes;
    const [remove] = nodeList;
    if (label !== null) {
      label.classList.remove('task-color-pink');
      label.classList.add('task-color-white');
    }
    if (trashCan !== null) {
      trashCan.classList.add('fas', 'fa-ellipsis-vertical');
      trashCan.classList.remove('far', 'fa-trash-alt');
    }
    if (check !== null) {
      check.checked = false;
      this.classList.remove('checked');
    }
    this.parentNode.classList.remove('task-color-white');
    this.parentNode.classList.add('task-color-pink');
    remove.classList.add('far', 'fa-trash-alt');
    this.setAttribute('contenteditable', 'true');
    this.setAttribute('autocomplete', 'on');
    this.focus();
  };

  taskDescripton[i].oninput = function () {
    changeTaskDescription(this.innerText);
  };

  taskDescripton[i].onblur = function () {
    if (getNewTaskDescription() !== '') {
      editTask(getNewTaskDescription(), parseInt(this.name, 10));
      changeTaskDescription();
    }
  };
}

document.querySelector('#add-item').addEventListener('click', () => {
  const div = document.querySelector('.task-color-pink');
  const trashCan = document.querySelector('.fa-trash-can');
  if (div !== null) {
    div.classList.remove('task-color-pink');
    div.classList.add('task-color-white');
  }
  if (trashCan !== null) {
    trashCan.classList.add('fas', 'fa-ellipsis-vertical');
    trashCan.classList.remove('far', 'fa-trash-alt');
  }
});

document.querySelector('#remove-item').addEventListener('click', () => {
  const div = document.querySelector('.task-color-pink');
  if (div !== null) {
    div.classList.remove('task-color-pink');
    div.classList.add('task-color-white');
  }
});

refreshList.addEventListener('click', (e) => {
  if (e.target.classList.contains('fa-rotate')) {
    displayTaskList();
    window.location.reload();
  }
});

const check = document.querySelectorAll('input[type=checkbox]');
for (let i = 0; i < check.length; i += 1) {
  check[i].onchange = function () {
    const div = this.nextElementSibling;
    const trashCan = document.querySelector('.fa-trash-can');
    const span = document.querySelector('.task-color-pink');
    if (trashCan !== null) {
      trashCan.classList.add('fas', 'fa-ellipsis-vertical');
      trashCan.classList.remove('far', 'fa-trash-alt');
    }

    if (span !== null) {
      span.classList.remove('task-color-pink');
      span.classList.add('task-color-white');
    }
    if (this.checked === true) {
      div.classList.add('checked');
    } else {
      div.classList.remove('checked');
    }
  };
}

const remove = document.getElementById('remove-item');
remove.addEventListener('click', () => {
  const textinputs = document.querySelectorAll('input[type=checkbox]');
  const empty = [].filter.call(textinputs, (el) => el.checked);
  empty.forEach((e) => {
    completeTask(parseInt(e.name, 10));
  });
  displayTaskList();
  window.location.reload();
});
