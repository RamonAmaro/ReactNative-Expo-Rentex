import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { StatusBar } from "react-native";
import { Acessory } from "../../components/Acessory";
import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { ImageSlider } from "../../components/ImageSlider";
import { ICars } from "../../Dtos/CardDtos";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import {
  About,
  Acessories,
  Brand,
  CardImages,
  Container,
  Content,
  Description,
  Details,
  Footer,
  Header,
  Name,
  Period,
  Price,
  Rent,
} from "./styles";

interface Params {
  carDetail: ICars;
}

export const CarDetails: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { carDetail } = route.params as Params;

  function handleGoBack() {
    navigation.goBack();
  }

  function handleConfirmRental() {
    navigation.navigate("Appointments", { carDetail: carDetail });
  }

  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <Header>
        <BackButton onPress={handleGoBack} />
      </Header>

      <CardImages>
        <ImageSlider imagesUrl={carDetail.photos} />
      </CardImages>

      <Content>
        <Details>
          <Description>
            <Brand> {carDetail.brand} </Brand>
            <Name> {carDetail.name} </Name>
          </Description>
          <Rent>
            <Period> {carDetail.rent.period} </Period>
            <Price> R$ {carDetail.rent.price} </Price>
          </Rent>
        </Details>

        <Acessories>
          {carDetail.accessories.map((accessory) => (
            <Acessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Acessories>

        <About>{carDetail.about}</About>
      </Content>
      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
};
