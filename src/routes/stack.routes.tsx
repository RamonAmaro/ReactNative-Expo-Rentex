import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import {
  AppointmentCompleted,
  AppointmentDetails,
  Appointments,
  CarDetails,
  Home,
} from "../screens";
import { MyCars } from "../screens/MyCars";
import { Splash } from "../screens/Splash";

const { Navigator, Screen } = createStackNavigator();

export const StackRoutes: React.FC = () => {
  return (
    <Navigator headerMode="none" initialRouteName="Splash">
      <Screen name="Splash" component={Splash} />
      <Screen
        name="Home"
        component={Home}
        options={{
          gestureEnabled: false,
        }}
      />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Appointments" component={Appointments} />
      <Screen name="AppointmentDetails" component={AppointmentDetails} />
      <Screen name="AppointmentCompleted" component={AppointmentCompleted} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
};
