import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { SocialAccountsScreen } from "../../screens/social/SocialAccountsScreen";
import { PostEditorScreen } from "../../screens/social/PostEditorScreen";
import { PostScheduleScreen } from "../../screens/social/PostScheduleScreen";
import { SocialAnalyticsScreen } from "../../screens/social/SocialAnalyticsScreen";

const StackNavigator = stackNavigatorFactory();

export type SocialStackParamList = {
  SocialAccounts: undefined;
  PostEditor: { accountId?: string };
  PostSchedule: undefined;
  SocialAnalytics: undefined;
};

export const SocialTabNavigator = () => (
  <StackNavigator.Navigator
    initialRouteName="SocialAccounts"
    screenOptions={{
      headerStyle: {
        backgroundColor: "#228B22",
      },
      headerTintColor: "white",
    }}
  >
    <StackNavigator.Screen 
      name="SocialAccounts" 
      component={SocialAccountsScreen}
      options={{
        title: "Social Media",
      }}
    />
    <StackNavigator.Screen 
      name="PostEditor" 
      component={PostEditorScreen}
      options={{
        title: "Create Post",
      }}
    />
    <StackNavigator.Screen 
      name="PostSchedule" 
      component={PostScheduleScreen}
      options={{
        title: "Schedule Posts",
      }}
    />
    <StackNavigator.Screen 
      name="SocialAnalytics" 
      component={SocialAnalyticsScreen}
      options={{
        title: "Social Analytics",
      }}
    />
  </StackNavigator.Navigator>
);