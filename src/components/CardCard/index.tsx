import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { ICars } from "../../Dtos/CardDtos";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import {
  About,
  Brand,
  CardImg,
  Container,
  Details,
  Name,
  Period,
  Price,
  Rent,
  Type
} from "./styles";

interface CardDataProps extends RectButtonProps {
  data: ICars;
}

export const CardCard: React.FC<CardDataProps> = ({ data, ...rest }) => {
  const MotorIcon = getAccessoryIcon(data.fuel_type);

  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand} </Brand>
        <Name> {data.name} </Name>
        <About>
          <Rent>
            <Period> {data.period}</Period>
            <Price> R$ {data.price}</Price>
          </Rent>
          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>
      <CardImg
        source={{
          uri: data.thumbnail,
        }}
        resizeMode="contain"
      />
    </Container>
  );
};
