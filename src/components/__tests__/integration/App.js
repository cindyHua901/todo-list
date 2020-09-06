import React from "react";
import { mount } from "enzyme";
import TodoListApp from "../../../App";
import { findTestWrapper } from "../../../utils/testUtils";

describe("行为测试", () => {
  it(`
      1. MyInput 输入框输入内容
      2. 点击回车
      3. 列表中展示用户输入的内容项
    `, () => {
    const wrapper = mount(<TodoListApp />);
    const inputElem = findTestWrapper(wrapper, "my-input");
    const content = "学习Jest";
    console.log(inputElem.length);
    inputElem.at(0).simulate("change", {
      target: { value: content },
    });

    inputElem.at(0).simulate("keyUp", {
      keyCode: 13,
    });

    const listItem = findTestWrapper(wrapper, "list-item");
    expect(listItem.length).toEqual(1);
    console.log("listItem.text()", listItem.text());
    expect(listItem.text()).toContain(content);
  });
});
