import React from "react";
import SafeArea from "../../components/SafeArea";
import { render } from "@testing-library/react-native";
import { ReactTestInstance } from "react-test-renderer";

const safeAreaTest = () => {
  describe("<SafeArea/> Component", () => {
    it("should have a parent component with `screen wrapper` accessibility label", () => {
      expect(
        render(<SafeArea />).getAllByA11yLabel("screen wrapper")
      ).toBeTruthy();
    });

    it("should render its children inside `ScrollView` component", () => {
      const { getByA11yLabel } = render(
        <SafeArea children="I should be inside ScrollView" />
      );
      const scrollView = getByA11yLabel("screen wrapper")
        .children[0] as ReactTestInstance;
      expect(scrollView.props.children).toBe("I should be inside ScrollView");
    });
  });
};

safeAreaTest();

export default safeAreaTest;
