import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { IntegrationListScreen } from "../../screens/integrations/IntegrationListScreen";
import { IntegrationDetailScreen } from "../../screens/integrations/IntegrationDetailScreen";
import { IntegrationSetupScreen } from "../../screens/integrations/IntegrationSetupScreen";
import { IntegrationSyncScreen } from "../../screens/integrations/IntegrationSyncScreen";

const StackNavigator = stackNavigatorFactory();

export type IntegrationsStackParamList = {
  IntegrationList: undefined;
  IntegrationDetail: { integrationId: string };
  IntegrationSetup: { platform: string };
  IntegrationSync: { integrationId: string };
};

export const IntegrationsTabNavigator = () => (
  <StackNavigator.Navigator
    initialRouteName="IntegrationList"
    screenOptions={{
      headerStyle: {
        backgroundColor: "#228B22",
      },
      headerTintColor: "white",
    }}
  >
    <StackNavigator.Screen 
      name="IntegrationList" 
      component={IntegrationListScreen}
      options={{
        title: "Integrations",
      }}
    />
    <StackNavigator.Screen 
      name="IntegrationDetail" 
      component={IntegrationDetailScreen}
      options={{
        title: "Integration Details",
      }}
    />
    <StackNavigator.Screen 
      name="IntegrationSetup" 
      component={IntegrationSetupScreen}
      options={{
        title: "Setup Integration",
      }}
    />
    <StackNavigator.Screen 
      name="IntegrationSync" 
      component={IntegrationSyncScreen}
      options={{
        title: "Sync Status",
      }}
    />
  </StackNavigator.Navigator>
);