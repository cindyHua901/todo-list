import React, { Component } from "react";
import PropTypes from "prop-types";
import { Checkbox, Input } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export default class TodoList extends Component {
  render() {
    const {
      typeText,
      list,
      deleteItem,
      changeTodoStatus,
      changeTodo,
    } = this.props;
    const isShowList = list.length > 0 ? true : false;

    return isShowList ? (
      <div className="todoList" data-test="todo-list">
        <div className="listTitle">
          {typeText}--{list.length}
        </div>
        <div className="list-content">
          {list.map((item) => {
            const divClass = item.isDone
              ? "todoItemDiv line-through"
              : "todoItemDiv";
            return (
              <div className="todoItem" data-test="list-item" key={item.id}>
                <Checkbox
                  data-test="checkbox"
                  checked={item.isDone}
                  onChange={(e) => {
                    changeTodo(item.id, "isDone", e.target.checked);
                  }}
                />
                {item.status === "div" ? (
                  <div
                    className={divClass}
                    onClick={() => {
                      changeTodoStatus(item.id);
                    }}
                  >
                    {item.todo}
                  </div>
                ) : (
                  <Input
                    className="todoItemInput"
                    data-test="input"
                    value={item.todo}
                    onChange={(e) => {
                      changeTodo(item.id, "todo", e.target.value);
                    }}
                    autoFocus="autofocus"
                    onBlur={() => {
                      changeTodoStatus("");
                    }}
                  />
                )}
                <DeleteOutlined
                  data-test="delete-item"
                  onClick={() => {
                    deleteItem(item.id);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    ) : (
      <></>
    );
  }
}

TodoList.propTypes = {
  typeText: PropTypes.string,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      todo: PropTypes.string,
      status: PropTypes.string,
      idDone: PropTypes.bool,
    })
  ),
  deleteItem: PropTypes.func.isRequired,
  changeTodoStatus: PropTypes.func.isRequired,
  changeTodo: PropTypes.func.isRequired,
};
