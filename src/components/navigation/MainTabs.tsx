import * as React from "react";
import { Color } from "@nativescript/core";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MediaTabNavigator } from "./MediaTabNavigator";
import { StoreTabNavigator } from "./StoreTabNavigator";
import { AnalyticsTabNavigator } from "./AnalyticsTabNavigator";
import { BookingsTabNavigator } from "./BookingsTabNavigator";
import { TasksTabNavigator } from "./TasksTabNavigator";
import { IntegrationsTabNavigator } from "./IntegrationsTabNavigator";
import { SocialTabNavigator } from "./SocialTabNavigator";
import { ReviewsTabNavigator } from "./ReviewsTabNavigator";
import { ExpensesTabNavigator } from "./ExpensesTabNavigator";
import { KnowledgeTabNavigator } from "./KnowledgeTabNavigator";
import { PurchaseTabNavigator } from "./PurchaseTabNavigator";
import { colors } from "../../theme/colors";
import { Label } from "../../components/native/nativeElements";

const BottomTabNavigator = createBottomTabNavigator();

export type MainTabsParamList = {
  MediaTab: undefined;
  StoreTab: undefined;
  AnalyticsTab: undefined;
  BookingsTab: undefined;
  TasksTab: undefined;
  IntegrationsTab: undefined;
  SocialTab: undefined;
  ReviewsTab: undefined;
  ExpensesTab: undefined;
  KnowledgeTab: undefined;
  PurchaseTab: undefined;
};

export const MainTabs = () => (
  <BottomTabNavigator.Navigator
    screenOptions={{
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textSecondary,
      tabBarActiveBackgroundColor: colors.background,
      tabBarInactiveBackgroundColor: colors.background,
      headerShown: false,
    }}
  >
    <BottomTabNavigator.Screen
      name="MediaTab"
      component={MediaTabNavigator}
      options={{
        tabBarLabel: "Media",
        tabBarIcon: ({ focused }) => (
          <Label className={`material-community ${focused ? 'text-primary' : 'text-secondary'}`}>
            {focused ? "image" : "image-outline"}
          </Label>
        ),
      }}
    />
    <BottomTabNavigator.Screen
      name="StoreTab"
      component={StoreTabNavigator}
      options={{
        tabBarLabel: "Store",
        tabBarIcon: ({ focused }) => (
          <Label className={`material-community ${focused ? 'text-primary' : 'text-secondary'}`}>
            {focused ? "store" : "store-outline"}
          </Label>
        ),
      }}
    />
    <BottomTabNavigator.Screen
      name="AnalyticsTab"
      component={AnalyticsTabNavigator}
      options={{
        tabBarLabel: "Analytics",
        tabBarIcon: ({ focused }) => (
          <Label className={`material-community ${focused ? 'text-primary' : 'text-secondary'}`}>
            {focused ? "chart-bar" : "chart-bar-outline"}
          </Label>
        ),
      }}
    />
    <BottomTabNavigator.Screen
      name="BookingsTab"
      component={BookingsTabNavigator}
      options={{
        tabBarLabel: "Bookings",
        tabBarIcon: ({ focused }) => (
          <Label className={`material-community ${focused ? 'text-primary' : 'text-secondary'}`}>
            {focused ? "calendar" : "calendar-outline"}
          </Label>
        ),
      }}
    />
    <BottomTabNavigator.Screen
      name="TasksTab"
      component={TasksTabNavigator}
      options={{
        tabBarLabel: "Tasks",
        tabBarIcon: ({ focused }) => (
          <Label className={`material-community ${focused ? 'text-primary' : 'text-secondary'}`}>
            {focused ? "checkbox-marked" : "checkbox-blank-outline"}
          </Label>
        ),
      }}
    />
    <BottomTabNavigator.Screen
      name="IntegrationsTab"
      component={IntegrationsTabNavigator}
      options={{
        tabBarLabel: "Integrations",
        tabBarIcon: ({ focused }) => (
          <Label className={`material-community ${focused ? 'text-primary' : 'text-secondary'}`}>
            {focused ? "link-variant" : "link-variant-outline"}
            </Label>
        ),
      }}
    />
    <BottomTabNavigator.Screen
      name="SocialTab"
      component={SocialTabNavigator}
      options={{
        tabBarLabel: "Social",
        tabBarIcon: ({ focused }) => (
          <Label className={`material-community ${focused ? 'text-primary' : 'text-secondary'}`}>
            {focused ? "share-variant" : "share-variant-outline"}
          </Label>
        ),
      }}
    />
    <BottomTabNavigator.Screen
      name="ReviewsTab"
      component={ReviewsTabNavigator}
      options={{
        tabBarLabel: "Reviews",
        tabBarIcon: ({ focused }) => (
          <Label className={`material-community ${focused ? 'text-primary' : 'text-secondary'}`}>
            {focused ? "star" : "star-outline"}
          </Label>
        ),
      }}
    />
    <BottomTabNavigator.Screen
      name="ExpensesTab"
      component={ExpensesTabNavigator}
      options={{
        tabBarLabel: "Expenses",
        tabBarIcon: ({ focused }) => (
          <Label className={`material-community ${focused ? 'text-primary' : 'text-secondary'}`}>
            {focused ? "cash" : "cash-outline"}
          </Label>
        ),
      }}
    />
    <BottomTabNavigator.Screen
      name="KnowledgeTab"
      component={KnowledgeTabNavigator}
      options={{
        tabBarLabel: "Knowledge",
        tabBarIcon: ({ focused }) => (
          <Label className={`material-community ${focused ? 'text-primary' : 'text-secondary'}`}>
            {focused ? "book" : "book-outline"}
          </Label>
        ),
      }}
    />
    <BottomTabNavigator.Screen
      name="PurchaseTab"
      component={PurchaseTabNavigator}
      options={{
        tabBarLabel: "Purchase",
        tabBarIcon: ({ focused }) => (
          <Label className={`material-community ${focused ? 'text-primary' : 'text-secondary'}`}>
            {focused ? "package-variant" : "package-variant-outline"}
          </Label>
        ),
      }}
    />
  </BottomTabNavigator.Navigator>
);