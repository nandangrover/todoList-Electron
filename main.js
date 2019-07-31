const { app, ipcMain } = require('electron');
const path = require('path');
require('electron-reload')(__dirname);

// Our constructors
const Window = require('./Window');
const dataStore = require('./DataStore');


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function main () {
  // Create the browser window.
  mainWindow = new Window({
    file: path.join('renderer', 'index.html'),
  });

  let addTodoWin;
  mainWindow.once('show', () => {
    mainWindow.webContents.send('todos', dataStore.todos);
  });

  ipcMain.on('add-todo-window', () => {
    if (!addTodoWin) {
      addTodoWin = new Window({
        file: path.join('renderer', 'view', 'add.html'),
        width: 400,
        height: 400,
        // Closes with main window
        parent: mainWindow,
      });

      addTodoWin.on('closed', () => {
        addTodoWin = null;
      })
    }
  });

  ipcMain.on('add-todo', (evt, todo) => {
    const updatedTodos = dataStore.addTodo(todo);
    mainWindow.send('todos', updatedTodos);
  });

  ipcMain.on('delete-todo', (evt, todo) => {
    const updatedTodos = dataStore.deleteTodo(todo);
    mainWindow.send('todos', updatedTodos);
  });

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', main)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    main()
  }
})



// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.