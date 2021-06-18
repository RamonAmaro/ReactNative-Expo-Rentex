import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { Container, IconContainer, InputText } from "./styles";

interface IInputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value: string;
}

export const InputPassword: React.FC<IInputProps> = ({
  iconName,
  value,
  ...rest
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const theme = useTheme();

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  function handlePasswordVisibledChange() {
    setIsPasswordVisible((prevState) => !prevState);
  }
  return (
    <Container isFocused={isFocused}>
      <IconContainer>
        <Feather
          name={iconName}
          color={
            isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
          }
          size={24}
        />
      </IconContainer>

      <InputText
        onFocus={() => setIsFocused(true)}
        onBlur={handleInputBlur}
        secureTextEntry={!isPasswordVisible}
        {...rest}
      />

      <BorderlessButton onPress={handlePasswordVisibledChange}>
        <IconContainer>
          <Feather
            name={isPasswordVisible ? "eye" : "eye-off"}
            color={theme.colors.text_detail}
            size={24}
          />
        </IconContainer>
      </BorderlessButton>
    </Container>
  );
};
