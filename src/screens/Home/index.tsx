import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { BackHandler, StatusBar, StyleSheet } from "react-native";
import { PanGestureHandler, RectButton } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
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
  TotalCars,
} from "./styles";

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export const Home: React.FC = () => {
  const [cars, setCars] = useState<ICars[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_event, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd() {},
  });

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

  /* Android Specific disabled back button */
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
  }, []);

  /* -------------------------------------- */

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
          <TotalCars> Total de {cars.length} Carros. </TotalCars>
        </HeaderContent>
      </Header>

      <CardList
        data={cars}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardCard data={item} onPress={() => handleCarDetails(item)} />
        )}
      />

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            {
              position: "absolute",
              bottom: 13,
              right: 22,
            },
          ]}
        >
          <ButtonAnimated onPress={handleMyCars} style={[styles.button]}>
            <Ionicons name="ios-car-sport" size={38} color="#fff" />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
});
