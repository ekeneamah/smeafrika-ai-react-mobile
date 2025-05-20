import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { BookingListScreen } from "../../screens/bookings/BookingListScreen";
import { BookingFormScreen } from "../../screens/bookings/BookingFormScreen";
import { BookingDetailScreen } from "../../screens/bookings/BookingDetailScreen";
import { CustomerSelectorScreen } from "../../screens/bookings/CustomerSelectorScreen";

const StackNavigator = stackNavigatorFactory();

export type BookingsStackParamList = {
  BookingList: undefined;
  BookingForm: { customerId?: string; bookingId?: string };
  BookingDetail: { bookingId: string };
  CustomerSelector: undefined;
};

export const BookingsTabNavigator = () => (
  <StackNavigator.Navigator
    initialRouteName="BookingList"
    screenOptions={{
      headerStyle: {
        backgroundColor: "#228B22",
      },
      headerTintColor: "white",
    }}
  >
    <StackNavigator.Screen 
      name="BookingList" 
      component={BookingListScreen}
      options={{
        title: "Bookings",
      }}
    />
    <StackNavigator.Screen 
      name="BookingForm" 
      component={BookingFormScreen}
      options={{
        title: "New Booking",
      }}
    />
    <StackNavigator.Screen 
      name="BookingDetail" 
      component={BookingDetailScreen}
      options={{
        title: "Booking Details",
      }}
    />
    <StackNavigator.Screen 
      name="CustomerSelector" 
      component={CustomerSelectorScreen}
      options={{
        title: "Select Customer",
      }}
    />
  </StackNavigator.Navigator>
);