const Store = require('electron-store');

class DataStore extends Store {
  constructor(props) {
    // To pass the store's context. I like the word props
    super(props);

    this.todos = this.get('todos') || [];
  }

  saveTodo() {
    this.set('todos', this.todos);

    return this;
  }

  getTodo() {
    this.todos = this.get('todos') || [];

    return this;
  }

  addTodo(todo) {
    this.todos = [...this.todos, todo];
    return this.saveTodo();
  }

  deleteTodo(todo) {
    this.todos = this.todos.filter(t => t !== todo);  
    return this.saveTodo();
  }
}

const dataStore = new DataStore({ name: 'Todo List' });

module.exports = dataStore;