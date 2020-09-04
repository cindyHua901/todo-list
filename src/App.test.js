import React from "react";
import App from "./App";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });
test("renders app", () => {
  const wrapper = mount(<App />);
  expect(wrapper.find("[data-test='container']")).toExist();
});
