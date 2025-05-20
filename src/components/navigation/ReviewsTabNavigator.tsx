import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { ReviewListScreen } from "../../screens/reviews/ReviewListScreen";
import { ReviewDetailScreen } from "../../screens/reviews/ReviewDetailScreen";
import { ReviewResponseScreen } from "../../screens/reviews/ReviewResponseScreen";
import { ReviewAnalyticsScreen } from "../../screens/reviews/ReviewAnalyticsScreen";

const StackNavigator = stackNavigatorFactory();

export type ReviewsStackParamList = {
  ReviewList: undefined;
  ReviewDetail: { reviewId: string };
  ReviewResponse: { reviewId: string };
  ReviewAnalytics: undefined;
};

export const ReviewsTabNavigator = () => (
  <StackNavigator.Navigator
    initialRouteName="ReviewList"
    screenOptions={{
      headerStyle: {
        backgroundColor: "#228B22",
      },
      headerTintColor: "white",
    }}
  >
    <StackNavigator.Screen 
      name="ReviewList" 
      component={ReviewListScreen}
      options={{
        title: "Reviews & Complaints",
      }}
    />
    <StackNavigator.Screen 
      name="ReviewDetail" 
      component={ReviewDetailScreen}
      options={{
        title: "Review Details",
      }}
    />
    <StackNavigator.Screen 
      name="ReviewResponse" 
      component={ReviewResponseScreen}
      options={{
        title: "Respond to Review",
      }}
    />
    <StackNavigator.Screen 
      name="ReviewAnalytics" 
      component={ReviewAnalyticsScreen}
      options={{
        title: "Review Analytics",
      }}
    />
  </StackNavigator.Navigator>
);