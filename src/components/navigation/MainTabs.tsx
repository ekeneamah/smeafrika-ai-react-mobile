import { Color } from "@nativescript/core";
import { bottomTabsNavigatorFactory } from "react-nativescript-navigation";
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

const BottomTabNavigator = bottomTabsNavigatorFactory();

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
      tabBarActiveTintColor: new Color(colors.primary),
      tabBarInactiveTintColor: new Color(colors.textSecondary),
      tabBarActiveBackgroundColor: new Color(colors.background),
      tabBarInactiveBackgroundColor: new Color(colors.background),
      headerShown: false,
    }}
  >
    <BottomTabNavigator.Screen
      name="MediaTab"
      component={MediaTabNavigator}
      options={{
        tabBarLabel: "Media",
        tabBarIcon: ({ focused }) => ({
          name: focused ? "image" : "image-outline",
          type: "material-community",
        }),
      }}
    />
    <BottomTabNavigator.Screen
      name="StoreTab"
      component={StoreTabNavigator}
      options={{
        tabBarLabel: "Store",
        tabBarIcon: ({ focused }) => ({
          name: focused ? "store" : "store-outline",
          type: "material-community",
        }),
      }}
    />
    <BottomTabNavigator.Screen
      name="AnalyticsTab"
      component={AnalyticsTabNavigator}
      options={{
        tabBarLabel: "Analytics",
        tabBarIcon: ({ focused }) => ({
          name: focused ? "chart-bar" : "chart-bar-outline",
          type: "material-community",
        }),
      }}
    />
    <BottomTabNavigator.Screen
      name="BookingsTab"
      component={BookingsTabNavigator}
      options={{
        tabBarLabel: "Bookings",
        tabBarIcon: ({ focused }) => ({
          name: focused ? "calendar" : "calendar-outline",
          type: "material-community",
        }),
      }}
    />
    <BottomTabNavigator.Screen
      name="TasksTab"
      component={TasksTabNavigator}
      options={{
        tabBarLabel: "Tasks",
        tabBarIcon: ({ focused }) => ({
          name: focused ? "checkbox-marked" : "checkbox-blank-outline",
          type: "material-community",
        }),
      }}
    />
    <BottomTabNavigator.Screen
      name="IntegrationsTab"
      component={IntegrationsTabNavigator}
      options={{
        tabBarLabel: "Integrations",
        tabBarIcon: ({ focused }) => ({
          name: focused ? "link-variant" : "link-variant-outline",
          type: "material-community",
        }),
      }}
    />
    <BottomTabNavigator.Screen
      name="SocialTab"
      component={SocialTabNavigator}
      options={{
        tabBarLabel: "Social",
        tabBarIcon: ({ focused }) => ({
          name: focused ? "share-variant" : "share-variant-outline",
          type: "material-community",
        }),
      }}
    />
    <BottomTabNavigator.Screen
      name="ReviewsTab"
      component={ReviewsTabNavigator}
      options={{
        tabBarLabel: "Reviews",
        tabBarIcon: ({ focused }) => ({
          name: focused ? "star" : "star-outline",
          type: "material-community",
        }),
      }}
    />
    <BottomTabNavigator.Screen
      name="ExpensesTab"
      component={ExpensesTabNavigator}
      options={{
        tabBarLabel: "Expenses",
        tabBarIcon: ({ focused }) => ({
          name: focused ? "cash" : "cash-outline",
          type: "material-community",
        }),
      }}
    />
    <BottomTabNavigator.Screen
      name="KnowledgeTab"
      component={KnowledgeTabNavigator}
      options={{
        tabBarLabel: "Knowledge",
        tabBarIcon: ({ focused }) => ({
          name: focused ? "book" : "book-outline",
          type: "material-community",
        }),
      }}
    />
    <BottomTabNavigator.Screen
      name="PurchaseTab"
      component={PurchaseTabNavigator}
      options={{
        tabBarLabel: "Purchase",
        tabBarIcon: ({ focused }) => ({
          name: focused ? "package-variant" : "package-variant-outline",
          type: "material-community",
        }),
      }}
    />
  </BottomTabNavigator.Navigator>
);