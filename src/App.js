import React from "react";
import "./App.css";

import TodoList from "./components/TodoList";
import MyInput from "./components/MyInput";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todoList: [],
    };
  }

  _getListFromStorage = () => {
    const storage = window.localStorage;
    let todoList = [];
    if (storage && storage.getItem("todoList")) {
      todoList = storage.getItem("todoList");
      todoList = JSON.parse(todoList);
    }
    return todoList;
  };

  _setList = (list) => {
    const storage = window.localStorage;
    if (storage) {
      storage.setItem("todoList", JSON.stringify(list));
    }
  };

  componentDidUpdate() {
    this._setList(this.state.todoList);
  }

  componentDidMount() {
    this.setState({
      todoList: this._getListFromStorage(),
    });
  }

  addTodo = (text) => {
    let todoList = [...this.state.todoList];
    todoList.push({
      id: new Date().getTime(),
      todo: text,
      idDone: false,
      status: "div",
    });
    this.setState({
      todoList,
    });
  };

  changeTodo = (id, property, value) => {
    let todoList = this.state.todoList.map((item) => {
      if (item.id === id) {
        item[property] = value;
      }
      return item;
    });
    this.setState({
      todoList,
    });
  };

  changeTodoStatus = (id) => {
    let todoList = this.state.todoList.map((item) => {
      if (item.id === id) {
        item.status = "input";
      } else {
        item.status = "div";
      }
      return item;
    });
    this.setState({
      todoList,
    });
  };

  deleteItem = (id) => {
    const todoList = this.state.todoList.filter((item) => item.id !== id);
    this.setState({
      todoList,
    });
  };

  render() {
    const { todoList } = this.state;
    const doneList = todoList.filter((item) => item.isDone);
    const undoList = todoList.filter((item) => !item.isDone);
    return (
      <div className="App" data-test="container">
        <MyInput addTodo={this.addTodo} />
        <TodoList
          typeText="Todo List"
          list={undoList}
          changeTodo={this.changeTodo}
          changeTodoStatus={this.changeTodoStatus}
          deleteItem={this.deleteItem}
        />
        <TodoList
          typeText="Done List"
          list={doneList}
          changeTodo={this.changeTodo}
          changeTodoStatus={this.changeTodoStatus}
          deleteItem={this.deleteItem}
        />
      </div>
    );
  }
}

export default App;
