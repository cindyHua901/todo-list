import React from "react";
import { shallow } from "enzyme";
import MyInput from "../../MyInput";
import { findTestWrapper } from "../../../utils/testUtils";

describe("测试MyInput组件", () => {
  it("包含一个输入框,一个按钮", () => {
    const fn = jest.fn();
    const wrapper = shallow(<MyInput addTodo={fn} />);
    const inputElem = findTestWrapper(wrapper, "my-input");
    const btnElem = findTestWrapper(wrapper, "btn");
    expect(inputElem.length).toBe(1);
    expect(btnElem.length).toBe(1);
  });

  it("输入框随着用户输入变化", () => {
    const fn = jest.fn();
    const wrapper = shallow(<MyInput addTodo={fn} />);
    const inputElem = findTestWrapper(wrapper, "my-input");
    const userInput = "今天你学习了么?";
    inputElem.simulate("change", {
      target: { value: userInput },
    });
    expect(wrapper.state("inputValue")).toEqual(userInput);
  });

  it("输入框无内容时，触发事件无反应", () => {
    const fn = jest.fn();
    const wrapper = shallow(<MyInput addTodo={fn} />);
    const inputElem = findTestWrapper(wrapper, "my-input");
    wrapper.setState({
      value: "",
    });
    inputElem.simulate("keyUp", {
      keyCode: 13,
    });
    // fn事没有被调用
    expect(fn).not.toHaveBeenCalled();
  });

  it("输入框有内容，触发回车事件，函数被调用，输入框清空", () => {
    const fn = jest.fn();
    const wrapper = shallow(<MyInput addTodo={fn} />);
    const inputElem = findTestWrapper(wrapper, "my-input");
    const userInput = "今天学习了吗";
    wrapper.setState({
      inputValue: userInput,
    });
    inputElem.simulate("keyUp", {
      keyCode: 13,
    });
    expect(fn).toHaveBeenCalled();
    expect(fn).toHaveBeenLastCalledWith(userInput);
    // 新获取dom 查看是否清空
    const newInputElem = findTestWrapper(wrapper, "my-input");
    expect(newInputElem.prop("value")).toBe("");
  });

  it("输入框有内容，点击按钮，函数被调用，输入框清空", () => {
    const fn = jest.fn();
    const wrapper = shallow(<MyInput addTodo={fn} />);
    const btnElem = findTestWrapper(wrapper, "btn");
    const userInput = "今天学习了吗";
    wrapper.setState({
      inputValue: userInput,
    });
    btnElem.simulate("click");
    expect(fn).toHaveBeenCalled();
    expect(fn).toHaveBeenLastCalledWith(userInput);
    // 新获取dom 查看是否清空
    const newInputElem = findTestWrapper(wrapper, "my-input");
    expect(newInputElem.prop("value")).toBe("");
  });
});
