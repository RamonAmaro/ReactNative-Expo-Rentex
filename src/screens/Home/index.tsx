import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Logo from "../../assets/logo.svg";
import { CardCard } from "../../components";
import { Loading } from "../../components/Loading";
import { ICars } from "../../Dtos/CardDtos";
import { api } from "../../services/api";
import {
  CardList,
  Container,
  Header,
  HeaderContent,
  MyCarsButton,
  TotalCars,
} from "./styles";

export const Home: React.FC = () => {
  const [cars, setCars] = useState<ICars[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  function handleCarDetails(carDetail: ICars) {
    navigation.navigate("CarDetails", { carDetail });
  }

  function handleMyCars() {
    navigation.navigate("MyCars");
  }

  useEffect(() => {
    async function loadCard() {
      try {
        const response = await api.get("/cars");
        setCars(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    loadCard();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <TotalCars> Total de 12 Carros. </TotalCars>
        </HeaderContent>
      </Header>

      <CardList
        data={cars}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardCard data={item} onPress={() => handleCarDetails(item)} />
        )}
      />

      <MyCarsButton onPress={handleMyCars}>
        <Ionicons name="ios-car-sport" size={38} color="#fff" />
      </MyCarsButton>
    </Container>
  );
};
