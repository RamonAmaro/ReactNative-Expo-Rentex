import React from "react";
import {
  CardImage,
  CardImageWrapper,
  Container,
  ImageIndex,
  ImageIndexes,
} from "./styles";

interface ImageSliderProps {
  imagesUrl: string[];
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ imagesUrl }) => {
  return (
    <Container>
      <ImageIndexes>
        <ImageIndex active={true} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
      </ImageIndexes>

      <CardImageWrapper>
        <CardImage source={{ uri: imagesUrl[0] }} resizeMode="contain" />
      </CardImageWrapper>
    </Container>
  );
};
