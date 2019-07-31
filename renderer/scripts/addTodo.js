const { ipcRenderer } = require('electron');

class addTodo {
  constructor() {
    this.init();
  }

  init() {
    document.getElementById('addBtn').addEventListener('click', () => {
      const value = document.getElementById('myInput').value;
      ipcRenderer.send('add-todo', value);
    });
  }
}

new addTodo();