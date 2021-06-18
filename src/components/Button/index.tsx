import React from "react";
import { ActivityIndicator } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";
import theme from "../../styles/theme";
import { Container, Title } from "./styles";

interface ButtonProps extends RectButtonProps {
  title: string;
  color?: string;
  loading?: boolean;
  light?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  color,
  loading = false,
  light = false,
  ...rest
}) => {
  return (
    <Container
      color={color}
      {...rest}
      enabled={rest.enabled}
      style={{ opacity: rest.enabled === false || loading === true ? 0.5 : 1 }}
    >
      {loading ? (
        <ActivityIndicator size="small" color={theme.colors.shape} />
      ) : (
        <Title isLight={light}> {title} </Title>
      )}
    </Container>
  );
};
