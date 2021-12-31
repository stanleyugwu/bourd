import * as React from "react";
import { View, TextInput, ViewStyle, TextInputProps } from "react-native";
import { IoniconName } from "@expo/vector-icons/build/Ionicons";
import { BoxShadow } from "./HOC/withBoxShadow";
import tw from "../library/tailwind";
import Text from "./Text";
import { Ionicons as Icon } from "@expo/vector-icons";
import { ClassInput } from "tailwind-react-native-classnames";

/** Props for cutom `TextInput` component */
type TextInputFieldProps = {
  /** Text to show above text box. */
  fieldTitle?: string;
  /** Custom accessibility text for component parent `View` */
  accessibilityLabel?: string;
  /** Name of `Ionicons` icon to display left to `fieldTitle` */
  fieldTitleIcon?: IoniconName;
  /** Input value */
  value?: string;
  /** Extra style for wrapper `View` component */
  containerStyle?: ViewStyle;
  /** Text-box placeholder */
  placeholder?: string;
  /**
   * Callback to be called when text-box recieves input. The callback will be called with the changed text
   */
  onChangeText?: ((text: string) => void) | (() => void);
};

/** Custom, customizable `TextInput` component for showing text input fields*/
const TextInputField = React.forwardRef<TextInput, TextInputFieldProps>(
  (
    {
      accessibilityLabel = "TextInput component",
      fieldTitle,
      fieldTitleIcon,
      value,
      containerStyle,
      placeholder,
      onChangeText,
    }: TextInputFieldProps,
    ref
  ) => {
    return (
      <BoxShadow
        accessibilityLabel={accessibilityLabel}
        style={tw.style(`p-4 my-3`, containerStyle as ClassInput)}
      >
        {fieldTitle && fieldTitle?.trim() ? (
          <View
            style={tw`flex-row mb-5`}
            accessibilityLabel="field title text wrapper"
          >
            {fieldTitleIcon && fieldTitleIcon?.trim() ? (
              <Icon
                name={fieldTitleIcon}
                accessibilityLabel="field text icon"
                size={20}
                style={tw`text-black`}
              />
            ) : null}
            <Text accessibilityLabel="field text" style={tw`ml-2`}>
              {fieldTitle}
            </Text>
          </View>
        ) : null}
        <TextInput
          onChangeText={onChangeText}
          placeholder={placeholder}
          value={value}
          ref={ref}
          style={tw`text-base ml-6`}
          accessibilityLabel="TextInputField main text-box"
        />
      </BoxShadow>
    );
  }
);

export default React.memo(TextInputField);
