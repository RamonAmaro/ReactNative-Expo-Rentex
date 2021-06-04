import React from "react";
import { ActivityIndicator } from "react-native";

export const Loading: React.FC = () => {
  return <ActivityIndicator color="red" size="large" style={{ flex: 1 }} />;
};
