const { ipcRenderer } = require('electron');
const dataStore = require('../DataStore');

class todoManager {
  constructor() {
    this.init();
  }

  init() {
    // Create a new window to add to-do elements
    document.getElementById('createTodo').addEventListener('click', () => {
      ipcRenderer.send('add-todo-window');
    });

    this.setTodoElementsInitially();

    // Check uncheck to-do list elements
    document.getElementById('myTodo').addEventListener('click', ({ target: { tagName, classList }}) => {
      if (tagName === 'LI') {
        classList.toggle('checked');
      }
    });

    ipcRenderer.on('todos', (evt, todos) => {
      if (todos) {
        this.setToDoListData(todos);
      }
    } );
  }

  setTodoElementsInitially() {
    this.setToDoListData(dataStore);
  }

  deleteElement({ id }) {
    ipcRenderer.send('delete-todo', id);
  }

  setToDoListData({ todos }) {
    const todoItem = todos.reduce((html, todo) => {
      html += `<li id="todoElement">${todo}<span id="${todo}" class="close">\u00D7</span></li>`;
      return html;
    }, '');

    document.getElementById('myTodo').innerHTML = todoItem;

    todos.forEach(element => {
      let closeBtn = document.getElementById(element);
      closeBtn.addEventListener('click', () => this.deleteElement(closeBtn));
    });
    
  }
  
}

new todoManager();