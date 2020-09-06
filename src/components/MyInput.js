import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input, Button } from "antd";

export default class MyInput extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: "",
    };
  }

  handleChange = (event) => {
    const inputValue = event.target.value;
    this.setState({
      inputValue,
    });
  };

  handleClickAddBtn = () => {
    const inputValue = this.state.inputValue;
    if (inputValue !== "") {
      this.props.addTodo(inputValue);
      this.setState({
        inputValue: "",
      });
    }
  };

  handleKeyUp = (e) => {
    const value = this.state.inputValue;
    if (e.keyCode === 13 && value) {
      this.props.addTodo(value);
      this.setState({
        inputValue: "",
      });
    }
  };

  render() {
    const { inputValue } = this.state;
    return (
      <div id="myInput">
        <Input
          data-test="my-input"
          placeholder="Todo someting..."
          value={inputValue}
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
        />
        <Button data-test="btn" type="primary" onClick={this.handleClickAddBtn}>
          Add
        </Button>
      </div>
    );
  }
}

MyInput.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
