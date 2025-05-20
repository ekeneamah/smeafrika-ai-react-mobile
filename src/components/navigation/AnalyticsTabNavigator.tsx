import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { AnalyticsDashboardScreen } from "../../screens/analytics/AnalyticsDashboardScreen";
import { TrafficReportScreen } from "../../screens/analytics/TrafficReportScreen";
import { ReviewAnalyticsScreen } from "../../screens/analytics/ReviewAnalyticsScreen";
import { ExpenseReportScreen } from "../../screens/analytics/ExpenseReportScreen";
import { SalesReportScreen } from "../../screens/analytics/SalesReportScreen";

const StackNavigator = stackNavigatorFactory();

export type AnalyticsStackParamList = {
  AnalyticsDashboard: undefined;
  SalesReport: { filter?: string };
  TrafficReport: { filter?: string };
  ReviewAnalytics: undefined;
  ExpenseReport: undefined;
};

export const AnalyticsTabNavigator = () => (
  <StackNavigator.Navigator
    initialRouteName="AnalyticsDashboard"
    screenOptions={{
      headerStyle: {
        backgroundColor: "#228B22",
      },
      headerTintColor: "white",
    }}
  >
    <StackNavigator.Screen 
      name="AnalyticsDashboard" 
      component={AnalyticsDashboardScreen}
      options={{
        title: "Analytics Dashboard",
      }}
    />
    <StackNavigator.Screen 
      name="SalesReport" 
      component={SalesReportScreen}
      options={{
        title: "Sales Report",
      }}
    />
    <StackNavigator.Screen 
      name="TrafficReport" 
      component={TrafficReportScreen}
      options={{
        title: "Traffic Report",
      }}
    />
    <StackNavigator.Screen 
      name="ReviewAnalytics" 
      component={ReviewAnalyticsScreen}
      options={{
        title: "Review Analytics",
      }}
    />
    <StackNavigator.Screen 
      name="ExpenseReport" 
      component={ExpenseReportScreen}
      options={{
        title: "Expense Report",
      }}
    />
  </StackNavigator.Navigator>
);