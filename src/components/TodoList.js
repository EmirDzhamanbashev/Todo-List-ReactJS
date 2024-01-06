import React, { Component } from "react";
import { Button, Input, List, Form } from "reactstrap";
import SingleTodo from "./SingleTodo";
import { v4 as uuidv4 } from "uuid";
import ClearAllTodos from "./ClearAllTodos";

const localStorageTodos = JSON.parse(localStorage.getItem("todos"));
const initialTodos = localStorageTodos !== null ? localStorageTodos : [];

export default class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      todos: initialTodos,
      newTodoInput: "",
      editId: null,
    };
  }

  handleInputChange = (e) => {
    this.setState({ newTodoInput: e.target.value });
  };

  handleAddTodo = (e) => {
    e.preventDefault();
    const { todos, newTodoInput } = this.state;
    const newTodos = todos.map((todo) => ({ ...todo }));
    if (newTodoInput.trim() !== "") {
      const newTodo = {
        id: uuidv4(),
        text: newTodoInput,
        complete: false,
      };
      newTodos.push(newTodo);
    } else {
      alert("Please type a todo text");
    }
    this.setState({ todos: newTodos, newTodoInput: "" });
    this.updateLocalStorage(newTodos);
  };

  updateLocalStorage = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  handleTodoComplete = (event, id) => {
    const { todos } = this.state;
    const isDoneTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, complete: event.target.checked };
      }
      return todo;
    });
    this.setState({ todos: isDoneTodos });
    this.updateLocalStorage(isDoneTodos);
  };

  handleTodoDelete = (id) => {
    const { todos } = this.state;
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    this.setState({ todos: filteredTodos });
    this.updateLocalStorage(filteredTodos);
  };

  handleTodoEdit = (id) => {
    this.setState({ editId: id });
  };

  handleTodoSave = (todoText, id) => {
    const { todos } = this.state;

    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: todoText };
      }
      return todo;
    });

    this.setState({ todos: updatedTodos, editId: null });
    this.updateLocalStorage(updatedTodos);
  };

  handleClearAllTodos = () => {
    const { todos } = this.state;
    const clearTodos = todos.splice();

    this.setState({ todos: clearTodos });
    this.updateLocalStorage(clearTodos);
    console.log(this.state.todos);
  };

  render() {
    const { todos, newTodoInput, editId } = this.state;
    return (
      <>
        <h2>Todo list React App</h2>
        <Form
          onSubmit={this.handleAddTodo}
          style={{ display: "grid", gridTemplateColumns: "80% 20%" }}
        >
          <Input value={newTodoInput} onChange={this.handleInputChange} />
          <Button color="primary">Add Todo</Button>
        </Form>
        <main>
          <List style={{ padding: "0" }}>
            {todos.map((todo) => {
              const editable = editId === todo.id;
              // console.log("you can edit todo with id", editable && todo.id);
              return (
                <SingleTodo
                  key={todo.id}
                  todo={todo}
                  editable={editable}
                  handleTodoComplete={this.handleTodoComplete}
                  handleTodoDelete={this.handleTodoDelete}
                  handleTodoEdit={this.handleTodoEdit}
                  handleTodoSave={this.handleTodoSave}
                />
              );
            })}
          </List>
        </main>
        {todos.length !== 0 && (
          <footer>
            <ClearAllTodos handleClearAllTodos={this.handleClearAllTodos} />
          </footer>
        )}
      </>
    );
  }
}
