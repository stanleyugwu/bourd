import * as React from "react";
import { View, ViewStyle } from "react-native";
import { ClassInput } from "tailwind-react-native-classnames";
import tw from "../../library/tailwind";
import { BoxShadow } from "../HOC/withBoxShadow";
import Text from "../Text";
import { useDispatch } from "react-redux";
import { modifyProjectTaskStatus } from "../../store/slices/projectsSlice";

/** Type for project tasks that has "doing" status*/
type DoingProps = {
  /** Task description */
  taskDescription: string;
  /** The task's `Id`. This will be needed when changing the task's status*/
  taskId: string;
  //   /** The `ID` of the project that has this active task. This will be needed when changing the task's status */
  //   projectId: string;
  /** Custom accessbility label for component parent `View` */
  accessibilityLabel?: string;
  /** Extra style for component parent `View` */
  containerStyle?: ViewStyle;
};

/** Renders a UI card representing project task having "doing" status */
const Doing = ({
  taskDescription = "",
  taskId,
  accessibilityLabel = "active task",
  containerStyle,
}: DoingProps) => {
  const dispatch = useDispatch();
  const handleMoveToTodo = React.useCallback(() => {
    dispatch(modifyProjectTaskStatus({ taskId, taskStatus: "to-do" }));
  }, [taskId]);
  const handleMoveToDone = React.useCallback(() => {
    dispatch(modifyProjectTaskStatus({ taskId, taskStatus: "done" }));
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
        accessibilityLabel="todo description container"
        style={tw.style(`py-2 px-4`)}
      >
        <Text accessibilityLabel="todo description">{taskDescription}</Text>
      </View>
      <View
        accessibilityLabel="todo card footer"
        style={tw.style(
          `bg-gray-100 border-t border-gray-100 px-3 py-1.5 flex-row`
        )}
      >
        <Text style={tw`text-sm font-bold`} onPress={handleMoveToTodo}>
          Move to Todos
        </Text>
        <Text style={tw`text-sm font-bold ml-4`} onPress={handleMoveToDone}>
          Move to Done
        </Text>
      </View>
    </BoxShadow>
  );
};

export default React.memo(Doing);
