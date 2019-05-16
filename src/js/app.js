/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */
/* eslint-disable func-names */
const form = document.getElementById('form');
const input = document.getElementById('input');
const pinnedTasks = document.getElementById('pinnedTasks');
const allTasks = document.getElementById('allTasks');
const pinnedTitle = document.getElementById('pinnedTitle');
const allTitle = document.getElementById('allTitle');

let tasksArray = [];
let hideEl = 0;
let hiddenCount = 0;

const newArr = () => {
  tasksArray = [];
  for (let i = 1; i < allTasks.childElementCount; i++) {
    tasksArray.push(allTasks.children[i].children[0].children[0].textContent);
  }
};


function hideArr() {
  if (allTasks.children[hideEl].style.display !== 'none') {
    allTasks.children[hideEl].style.display = 'none';
    hiddenCount++;
  }
}

const letters = (firstChar, otherChars) => {
  let counter = 0;
  for (let i = 0; i < otherChars.length; i++) {
    if (firstChar.charAt(i) !== otherChars.charAt(i)) {
      hideArr();
      break;
    }
    counter++;
  }
  return counter;
};

input.onkeypress = function (event) {
  const key = event.keyCode;
  if (key === 13) {
    return;
  }
  newArr();
  let max = 0;
  for (let i = 0; i < tasksArray.length; i++) {
    hideEl++;
    const firstChar = tasksArray[i].toLowerCase();
    const otherChars = (input.value.toLowerCase()
    + String.fromCharCode(event.keyCode).toLowerCase());
    if (letters(firstChar, otherChars) > max) {
      tasksArray[i];
      max = letters(firstChar, otherChars);
    }
  }
  hideEl = 0;

  if (allTasks.childElementCount === 1 || max === 0
    || hiddenCount === allTasks.childElementCount - 1) {
    allTitle.textContent = 'All Tasks: No tasks found';
  } else {
    allTitle.textContent = 'All Tasks:';
  }
};


let idCount = 6;


form.addEventListener('click', (event) => {
  if (event.toElement.className === 'taskCheckbox') {
    const checkbox = document.getElementById(event.toElement.id);
    checkbox.classList.add('checked');
    const div = document.createElement('div');
    div.className = 'task';


    if (checkbox.checked) {
      div.innerHTML = `
      <label class="taskLabel">
          <span class="taskName">${checkbox.previousElementSibling.textContent}</span>
          <input id="${event.toElement.id}" class="taskCheckbox" type="checkbox" checked>
        </label>`;
      pinnedTasks.appendChild(div);
    } else {
      div.innerHTML = `
        <label class="taskLabel">
          <span class="taskName">${checkbox.previousElementSibling.textContent}</span>
          <input id="${event.toElement.id}" class="taskCheckbox" type="checkbox">
        </label>`;
      allTasks.appendChild(div);
    }

    checkbox.parentNode.parentNode.remove();

    if (pinnedTasks.childElementCount === 1) {
      pinnedTitle.textContent = 'Pinned: No pinned tasks';
    } else {
      pinnedTitle.textContent = 'Pinned:';
    }

    if (allTasks.childElementCount === 1) {
      allTitle.textContent = 'All Tasks: No tasks found';
    } else {
      allTitle.textContent = 'All Tasks:';
    }
  }
});

input.addEventListener('keypress', (event) => {
  const key = event.keyCode;
  if (key === 13) {
    event.preventDefault();
    if (input.value !== '') {
      const div = document.createElement('div');
      div.setAttribute('data-tasksData', `Task Name ${idCount}`);
      div.className = 'task';
      div.innerHTML = `
      <label class="taskLabel">
        <span class="taskName">${input.value}</span>
        <input id="${idCount++}" class="taskCheckbox" type="checkbox">
      </label>`;
      allTasks.appendChild(div);
      input.value = '';
      allTitle.textContent = 'All Tasks:';
    }

    for (let i = 0; i < allTasks.childElementCount; i++) {
      allTasks.children[i].style.display = 'block';
    }
  }
});
