import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import Button from "../../components/Button";

const buttonTest = () => {
  describe("<Button/> Component", () => {
    it("should render a button with `Click Me` label", () => {
      const { getByA11yLabel } = render(
        <Button onPress={() => null} title="Click Me" />
      );
      expect(getByA11yLabel("button text").props.children).toBe("Click Me");
    });

    it("should render an icon with given name inside button", () => {
      const { getByA11yRole } = render(
        <Button onPress={() => null} title="Click Me" iconName="home" />
      );
      const innerView: JSX.Element = getByA11yRole("button").props.children[0];
      expect(innerView.props.children[0].props.name).toBe("home");
    });

    it("should render an icon with given name to a given position inside button", () => {
      //LEFT
      const { getByA11yRole: getByA11yRole1 } = render(
        <Button
          onPress={() => null}
          title="Click Me"
          iconName="home"
          iconPosition="left"
        />
      );
      let innerView: JSX.Element = getByA11yRole1("button").props.children[0];
      expect(innerView.props.children[0].props.name).toBe("home");

      //RIGHT
      const { getByA11yRole } = render(
        <Button
          onPress={() => null}
          title="Click Me"
          iconName="home"
          iconPosition="right"
        />
      );
      innerView = getByA11yRole("button").props.children[0];
      expect(innerView.props.children[2].props.name).toBe("home");
    });

    it("should render a parent component with given accessibility label", () => {
      expect(
        render(
          <Button
            title="Click Me"
            onPress={() => null}
            accessibilityLabel="Custom A11Y Label"
          />
        ).container.props.accessibilityLabel
      ).toBe("Custom A11Y Label");
    });

    it("should invoke given callback function when button is pressed", () => {
      const mockFn = jest.fn();
      const container = render(
        <Button onPress={mockFn} title="Click Me" />
      ).container;
      fireEvent.press(container);
      expect(mockFn).toBeCalledTimes(1);
    });
  });
};

buttonTest();

export default buttonTest;
