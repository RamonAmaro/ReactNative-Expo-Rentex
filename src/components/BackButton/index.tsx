import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { BorderlessButtonProps } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { Container } from "./styles";

interface IBackButtonProps extends BorderlessButtonProps {
  color?: string;
}
export const BackButton: React.FC<IBackButtonProps> = ({ color, ...rest }) => {
  const { colors } = useTheme();

  return (
    <Container {...rest}>
      <MaterialIcons
        name="chevron-left"
        size={32}
        color={color ? color : colors.text}
      />
    </Container>
  );
};
