import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ProjectCard from "../../components/ProjectCard";

const projectCardTest = () => {
  describe("<ProjectCard/> Component", () => {
    it(`should render a UI Card component displaying below project details:
              Project Name,
              Project Description, 
              Project Creation Date in time-ago format e.g 'a few seconds ago', 
              Number Of Tasks, 
              Number Of Completed Tasks`, () => {
      const { getByA11yLabel } = render(
        <ProjectCard
          projectTitle="Test Project"
          projectDescription="Test Description"
          creationDate={Date.now()}
          numberOfCompletedTasks={1}
          numberOfTasks={3}
          projectId="1234567"
        />
      );

      expect(getByA11yLabel("project name").props.children).toBe(
        "Test Project"
      );
      expect(getByA11yLabel("project description").props.children).toBe(
        "Test Description"
      );
      expect(getByA11yLabel("project creation date").props.children).toBe(
        "a few seconds ago"
      );
      expect(getByA11yLabel("number of tasks").props.children[1]).toBe(3);
      expect(
        getByA11yLabel("number of completed tasks").props.children[1]
      ).toBe(1);
    });

    it("should invoke given callback when project card is pressed", () => {
      const mockPressFn = jest.fn();
      const containerButton = render(
        <ProjectCard
          projectTitle="Test Project"
          projectDescription="Test Description"
          creationDate={Date.now()}
          onPress={mockPressFn}
          numberOfCompletedTasks={1}
          numberOfTasks={3}
          projectId="1234567"
        />
      ).container;
      fireEvent.press(containerButton);
      expect(mockPressFn).toBeCalledTimes(1);
    });
  });
};
projectCardTest();

export default projectCardTest;
