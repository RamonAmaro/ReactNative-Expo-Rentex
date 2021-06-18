import React from "react";
import { Container } from "./styles";

export interface ImageIndexProps {
  active?: boolean;
}
export const ImageIndex: React.FC<ImageIndexProps> = ({ active = false }) => {
  return <Container active={active}></Container>;
};
