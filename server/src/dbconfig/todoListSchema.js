import mongoose from 'mongoose';
import {todoSchema} from './todoSchema';
const todoListSchema = new mongoose.Schema({
  owner: {type: mongoose.Types.ObjectId, required: true},
  todos: [todoSchema],
});

todoListSchema.methods.addTodo = function addTodo(todo) {
  this.todos.push(todo);
};

todoListSchema.methods.updateTodo = function updateTodo(todo) {
  for(let i = 0; i < this.todos.length; i++) {
      if(this.todos[i]._id == todo._id) {
          this.todos[i] = todo;
          break;
      }
  }
}

todoListSchema.methods.toggleTodo = function toggleTodo(todoId) {
  for(let i = 0; i < this.todos.length; i++) {
      if(this.todos[i]._id == todoId) {
          this.todos[i].done = !this.todos[i].done;
          break;
      }
  }
}

todoListSchema.methods.deleteTodos = function deleteTodos(todoIds) {
  for(let i = 0; i < this.todos.length; i++) {
      for(let j = 0; j < todoIds.length; j++) {
          if(this.todos[i]._id == todoIds[j])
          {
              this.todos.splice(i, 1);
          }
      }
  }
};

export const TodoList = mongoose.model('TodoList', todoListSchema);
