import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import {
  AppointmentDetails,
  Appointments,
  CarDetails,
  Confirmation,
  Home,
  MyCars,
  Splash
} from "../screens";

const { Navigator, Screen } = createStackNavigator();

export const AppStackRoutes: React.FC = () => {
  return (
    <Navigator headerMode="none" initialRouteName="Home">
      <Screen
        name="Splash" component={Splash} />
      <Screen name="Home"component={Home} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Appointments" component={Appointments} />
      <Screen name="AppointmentDetails" component={AppointmentDetails} />
      <Screen name="Confirmation" component={Confirmation} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
};
