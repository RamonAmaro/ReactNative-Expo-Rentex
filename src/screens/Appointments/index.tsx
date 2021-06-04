import { useNavigation, useRoute } from "@react-navigation/native";
import { format } from "date-fns";
import React, { useState } from "react";
import { StatusBar } from "react-native";
import { useTheme } from "styled-components";
import ArrowSvg from "../../assets/arrow.svg";
import { BackButton } from "../../components";
import { Button } from "../../components/Button";
import {
  Callendar,
  IDayProps,
  IMarketDatesProps,
} from "../../components/Callendar";
import { generateInterval } from "../../components/Callendar/generateInterval";
import { ICars } from "../../Dtos/CardDtos";
import { getPlatformDate } from "../../utils/getPlatformDate";
import {
  Container,
  Content,
  DateInfo,
  DateTitle,
  DateValue,
  Footer,
  Header,
  RentalPeriod,
  Title,
} from "./styles";

interface IRentalPeriod {
  start: number;
  startFormatted: string;
  end: number;
  endFormatted: string;
}

interface Params {
  carDetail: ICars;
}

export const Appointments: React.FC = () => {
  const [lastSelectedData, setLastSelectedDate] = useState<IDayProps>(
    {} as IDayProps
  );
  const [markedDates, setMarkedDates] = useState<IMarketDatesProps>(
    {} as IMarketDatesProps
  );

  const [rentalPeriod, setRentalPeriod] = useState<IRentalPeriod>(
    {} as IRentalPeriod
  );

  const navigation = useNavigation();
  const route = useRoute();

  const { carDetail } = route.params as Params;

  function handleConfirmRental() {
    navigation.navigate("AppointmentDetails", {
      carDetail: carDetail,
      dates: Object.keys(markedDates),
    });
  }

  function handleChangeDate(day: IDayProps) {
    let start = !lastSelectedData.timestamp ? day : lastSelectedData;
    let end = day;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      start: start.timestamp,
      end: end.timestamp,
      startFormatted: format(
        getPlatformDate(new Date(firstDate)),
        "dd/MM/yyyy"
      ),
      endFormatted: format(getPlatformDate(new Date(endDate)), "dd/MM/yyyy"),
    });
  }

  function handleGoBack() {
    navigation.goBack();
  }

  const { colors } = useTheme();
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <BackButton onPress={handleGoBack} color={colors.shape} />

        <Title>
          Escolha uma {"\n"}
          data de inicio e {"\n"}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATE</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Callendar marketDates={markedDates} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button
          title="Confirmar"
          onPress={handleConfirmRental}
          enabled={!!rentalPeriod.startFormatted || !rentalPeriod.endFormatted}
        />
      </Footer>
    </Container>
  );
};
