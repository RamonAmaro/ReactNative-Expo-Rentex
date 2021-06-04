import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { format } from "date-fns/esm";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { Acessory } from "../../components/Acessory";
import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { ImageSlider } from "../../components/ImageSlider";
import { ICars } from "../../Dtos/CardDtos";
import { api } from "../../services/api";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { getPlatformDate } from "../../utils/getPlatformDate";
import {
  Acessories,
  Brand,
  CalendarIcon,
  CardImages,
  Container,
  Content,
  DateInfo,
  DateTitle,
  DateValue,
  Description,
  Details,
  Footer,
  Header,
  Name,
  Period,
  Price,
  Rent,
  RentalPeriod,
  RentalPrice,
  RentalPriceDetails,
  RentalPriceLabel,
  RentalPriceQuota,
  RentalPriceQuotaTotal,
} from "./styles";

interface Params {
  carDetail: ICars;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

export const AppointmentDetails: React.FC = () => {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const [loading, setLoading] = useState(false);

  const { colors } = useTheme();

  const navigation = useNavigation();
  const route = useRoute();

  const { carDetail, dates } = route.params as Params;

  const rentalTotal = Number(dates.length * carDetail.rent.price);

  async function handleRentalCompleted() {
    setLoading(true);
    const appointmentByCar = await api.get(`/schedules_bycars/${carDetail.id}`);

    const unavailable_dates = [
      ...appointmentByCar.data.unavailable_dates,
      ...dates,
    ];

    await api.post("schedules_byuser", {
      user_id: 1,
      carDetail,
      startDate: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
      endDate: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
      created_at: new Date(),
    });

    api
      .put(`/schedules_bycars/${carDetail.id}`, {
        id: carDetail.id,
        unavailable_dates,
      })
      .then((_response) => navigation.navigate("AppointmentCompleted"))
      .catch(() => {
        Alert.alert("Não foi possivel confiarm o agendamento!");
        setLoading(false);
      });

    navigation.navigate("AppointmentCompleted");
  }

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });
  }, []);

  return (
    <Container>
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

        <RentalPeriod>
          <CalendarIcon>
            <Feather name="calendar" size={RFValue(24)} color={colors.shape} />
          </CalendarIcon>

          <DateInfo>
            <DateTitle> DE </DateTitle>
            <DateValue> {rentalPeriod.start} </DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(20)}
            color={colors.text}
          />

          <DateInfo>
            <DateTitle> ATÉ </DateTitle>
            <DateValue> {rentalPeriod.end} </DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel> TOTAL </RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>
              {` R$ ${carDetail.rent.price} x${dates.length} diárias`}{" "}
            </RentalPriceQuota>
            <RentalPriceQuotaTotal> R$ {rentalTotal} </RentalPriceQuotaTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button
          title="Alugar Agora"
          color={colors.success}
          onPress={handleRentalCompleted}
          loading={loading}
          enabled={!loading}
        />
      </Footer>
    </Container>
  );
};
