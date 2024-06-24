import { ThemeProps, useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import TextInput from "react-native-paper/src/components/TextInput/TextInput";

export type TextInputProps = ThemeProps;
interface FormInputProps extends TextInputProps {
  label: string;
  type?: string;
  required?: boolean;
  value?: any;
  onChangeText?: any;
  secureTextEntry?: boolean;
  right?: React.ReactNode;
  left?: React.ReactNode;
  number?: number;
}

const CustomInput: React.FC<FormInputProps> = ({
  label,
  type,
  required,
  value,
  onChangeText,
  secureTextEntry,
  lightColor,
  darkColor,
  right,
  left,
  number,
  ...otherProps
}) => {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );
  return (
    <TextInput
      style={{
        backgroundColor,
        fontSize: 17,
        color: "black",
        marginTop: 6,
      }}
      textColor={textColor}
      label={label}
      mode="outlined"
      autoCapitalize="none"
      outlineColor="#E6E8EE"
      activeOutlineColor="#581845"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      left={left}
      right={right}
      {...otherProps}
      numberOfLines={number}
      multiline
      
    />
  );
};

export default CustomInput;
