import React from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Logo from "../../assets/logo.svg";
import { Container, Header, HeaderContent, TotalCars } from "./styles";

export const Home: React.FC = () => {
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(120)} height={RFValue(22)} />
          <TotalCars> Total de 12 Carros. </TotalCars>
        </HeaderContent>
      </Header>
    </Container>
  );
};
