import * as React from "react";
import { View, ViewStyle } from "react-native";
import { ClassInput } from "tailwind-react-native-classnames";
import tw from "../../library/tailwind";
import { BoxShadow } from "../HOC/withBoxShadow";
import Text from "../Text";
import { useDispatch } from "react-redux";
import { modifyProjectTaskStatus } from "../../store/slices/projectsSlice";

/** Type for project tasks that has "done" status*/
type DoneProps = {
  /** Task description */
  taskDescription: string;
  /** The task's `Id`. This will be needed when changing the task's status*/
  taskId: string;
  /** Custom accessbility label for component parent `View` */
  accessibilityLabel?: string;
  /** Extra style for component parent `View` */
  containerStyle?: ViewStyle;
};

/** Renders a UI card representing project task having "done" status */
const Done = ({
  taskDescription = "",
  taskId,
  accessibilityLabel = "done task",
  containerStyle,
}: DoneProps) => {
  const dispatch = useDispatch();
  const handleMoveToTodo = React.useCallback(() => {
    dispatch(modifyProjectTaskStatus({ taskId, taskStatus: "to-do" }));
  }, [taskId]);

  return (
    <BoxShadow
      style={tw.style(
        "flex-col justify-between rounded-sm",
        containerStyle as ClassInput
      )}
      accessibilityLabel={accessibilityLabel}
    >
      <View
        accessibilityLabel="done-task description container"
        style={tw.style(`py-2 px-4`)}
      >
        <Text accessibilityLabel="done-task description">
          {taskDescription}
        </Text>
      </View>
      <View
        accessibilityLabel="done-task footer"
        style={tw.style(`bg-gray-100 border-t border-gray-100 px-3 py-1.5`)}
      >
        <Text style={tw`text-sm font-bold`} onPress={handleMoveToTodo}>
          Move to Todos
        </Text>
      </View>
    </BoxShadow>
  );
};

export default React.memo(Done);
