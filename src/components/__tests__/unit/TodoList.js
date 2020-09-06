import React from "react";
import { shallow } from "enzyme";
import TodoList from "../../TodoList";
import { findTestWrapper } from "../../../utils/testUtils";

describe("测试TodoList", () => {
  it("列表数目为0时，列表无内容", () => {
    const wrapper = shallow(<TodoList list={[]} />);
    const listItems = findTestWrapper(wrapper, "list-item");
    expect(listItems.length).toEqual(0);
  });

  it("列表不为空", () => {
    const listData = [
      { id: 1, todo: "今天学习了吗", status: "div", isDone: false },
      { id: 2, todo: "sql语句", status: "div", isDone: true },
      { id: 3, todo: "健身房", status: "div", isDone: false },
    ];
    const wrapper = shallow(<TodoList list={listData} />);
    const listItems = findTestWrapper(wrapper, "list-item");
    expect(listItems.length).toEqual(listData.length);
  });

  it("点击删除按钮，会调用删除方法", () => {
    const listData = [
      { id: 1, todo: "今天学习了吗", status: "div", isDone: false },
      { id: 2, todo: "sql语句", status: "div", isDone: true },
      { id: 3, todo: "健身房", status: "div", isDone: false },
    ];
    const fn = jest.fn();
    const wrapper = shallow(<TodoList list={listData} deleteItem={fn} />);
    const deleteItems = findTestWrapper(wrapper, "delete-item");
    // 模拟点了第二个
    const index = 1;
    deleteItems.at(index).simulate("click");
    expect(fn).toHaveBeenLastCalledWith(listData[index].id);
  });

  it("列表有内容的时候，每一项前面有一个checkbox", () => {
    const listData = [
      { id: 1, todo: "今天学习了吗", status: "div", isDone: false },
      { id: 2, todo: "sql语句", status: "div", isDone: true },
      { id: 3, todo: "健身房", status: "div", isDone: false },
    ];
    const wrapper = shallow(<TodoList list={listData} />);
    const checkboxItem = findTestWrapper(wrapper, "checkbox");
    expect(checkboxItem.length).toBe(listData.length);
  });

  it("当checkbox点击触发执行 changeTodo函数,改变isDone", () => {
    const listData = [
      { id: 1, todo: "今天学习了吗", status: "div", isDone: false },
      { id: 2, todo: "sql语句", status: "div", isDone: true },
      { id: 3, todo: "健身房", status: "div", isDone: false },
    ];
    const fn = jest.fn();
    const wrapper = shallow(<TodoList list={listData} changeTodo={fn} />);
    const checkboxItems = findTestWrapper(wrapper, "checkbox");
    // 模拟点第2项
    const idx = 1;
    const checked = !listData[idx].isDone;
    checkboxItems.at(idx).simulate("change", {
      target: { checked },
    });
    expect(fn).toHaveBeenLastCalledWith(listData[idx].id, "isDone", checked);
  });

  it("当某一个Input失去焦点时触发handleBlur方法", () => {
    const listData = [
      { id: 1, todo: "今天学习了吗", status: "div", isDone: false },
      { id: 2, todo: "sql语句", status: "input", isDone: true },
      { id: 3, todo: "健身房", status: "div", isDone: false },
    ];
    const fn = jest.fn();
    const wrapper = shallow(<TodoList list={listData} changeTodoStatus={fn} />);
    const inputElem = findTestWrapper(wrapper, "input");
    inputElem.simulate("blur");
    expect(fn).toHaveBeenCalled();
  });

  it("当某一个Input变更时，触发执行valueChange, 修改todo", () => {
    const listData = [
      { id: 1, todo: "今天学习了吗", status: "div", isDone: false },
      { id: 2, todo: "sql语句", status: "input", isDone: true },
      { id: 3, todo: "健身房", status: "div", isDone: false },
    ];
    const fn = jest.fn();
    const wrapper = shallow(<TodoList list={listData} changeTodo={fn} />);
    const inputElem = findTestWrapper(wrapper, "input");
    const idx = 1;
    const value = "hi 哥们儿 我变了";
    inputElem.simulate(
      "change",
      {
        target: { value },
      },
      listData[idx].id,
      "todo"
    );
    expect(fn).toHaveBeenLastCalledWith(listData[idx].id, "todo", value);
  });
});
