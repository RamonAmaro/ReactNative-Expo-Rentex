import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  Calendar as CustomCalendar,
  DateCallbackHandler,
  LocaleConfig,
} from "react-native-calendars";
import { useTheme } from "styled-components";
import { ptBr } from "./locaConfig";

LocaleConfig.locales["pt-br"] = ptBr;

LocaleConfig.defaultLocale = "pt-br";

interface IMarketDatesProps {
  [data: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disableTouchEvent?: boolean;
  };
}

interface IDayProps {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

interface ICalenderProps {
  marketDates: IMarketDatesProps;
  onDayPress: DateCallbackHandler;
}

const Callendar: React.FC<ICalenderProps> = ({ marketDates, onDayPress }) => {
  const { colors, fonts } = useTheme();

  return (
    <CustomCalendar
      renderArrow={(direction) => (
        <Feather
          size={24}
          color={colors.shape}
          name={direction === "right" ? "chevron-right" : "chevron-left"}
        />
      )}
      headerStyle={{
        backgroundColor: colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.text_detail,
        paddingBottom: 10,
        marginBottom: 10,
      }}
      theme={{
        textDayFontFamily: fonts.primary_400,
        textDayHeaderFontFamily: fonts.primary_500,
        textDayHeaderFontSize: 10,
        textMonthFontFamily: fonts.secondary_600,
        textMonthFontSize: 20,
        monthTextColor: colors.title,
        arrowStyle: {
          marginHorizontal: -15,
        },
      }}
      firstDay={1}
      minDate={new Date()}
      markingType="period"
      markedDates={marketDates}
      onDayPress={onDayPress}
    />
  );
};

export { Callendar, IMarketDatesProps, IDayProps };
