import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { StatusBar, useWindowDimensions } from "react-native";
import DoneSvg from "../../assets/done.svg";
import LogoSvg from "../../assets/logo_background_gray.svg";
import { ConfirmButton } from "../../components/ConfirmButton";
import { Container, Content, Footer, Message, Title } from "./styles";

interface IParams {
  title: string;
  message: string;
  nextScreenRoute: string;
}

export const Confirmation: React.FC = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  const route = useRoute();

  const { title, message, nextScreenRoute } = route.params as IParams;

  function handleConfirm() {
    navigation.navigate(nextScreenRoute);
  }
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title> {title}</Title>

        <Message>{message}</Message>
      </Content>

      <Footer>
        <ConfirmButton title="OK" onPress={handleConfirm} />
      </Footer>
    </Container>
  );
};
