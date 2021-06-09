import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Acessory } from "../../components/Acessory";
import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { ImageSlider } from "../../components/ImageSlider";
import { ICars } from "../../Dtos/CardDtos";
import theme from "../../styles/theme";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import {
  About,
  Acessories,
  Brand,
  CardImages,
  Container,
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

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 80],
        Extrapolate.CLAMP
      ),
    };
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0]),
    };
  });

  function handleGoBack() {
    navigation.goBack();
  }

  function handleConfirmRental() {
    navigation.navigate("Appointments", { carDetail: carDetail });
  }

  return (
    <Container>
      <StatusBar barStyle="dark-content" />

      <Animated.View
        style={[
          headerStyleAnimation,
          styles.header,
          { backgroundColor: theme.colors.background_secondary },
        ]}
      >
        <Header style={styles.header}>
          <BackButton onPress={handleGoBack} />
        </Header>

        <Animated.View style={sliderCarsStyleAnimation}>
          <CardImages>
            <ImageSlider imagesUrl={carDetail.photos} />
          </CardImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          padding: 24,
          paddingTop: getStatusBarHeight() + 160,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
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

        <About>
          {carDetail.about}
          {carDetail.about}
          {carDetail.about}
          {carDetail.about}
          {carDetail.about}
        </About>
      </Animated.ScrollView>
      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    overflow: "hidden",
    zIndex: 1,
  },
});
