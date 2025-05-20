import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { IntegrationsStackParamList } from "../../components/navigation/IntegrationsTabNavigator";
import { ScrollView, StackLayout, Label, Button } from "../../components/native/nativeElements";
import { RootState, AppDispatch } from "../../store/store";
import { fetchIntegrationById, fetchSyncStatus } from "../../store/slices/integrationSlice";

export const IntegrationDetailScreen = ({ route, navigation }: {
  route: RouteProp<IntegrationsStackParamList, "IntegrationDetail">,
  navigation: FrameNavigationProp<IntegrationsStackParamList, "IntegrationDetail">
}) => {
  const { integrationId } = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const { currentIntegration, syncStatus } = useSelector((state: RootState) => state.integrations);

  React.useEffect(() => {
    dispatch(fetchIntegrationById(integrationId));
    dispatch(fetchSyncStatus(integrationId));
  }, [dispatch, integrationId]);

  if (!currentIntegration) return null;

  return (
    <ScrollView className="bg-background">
      <StackLayout className="p-4">
        <StackLayout className="card">
          <Label className="text-title mb-2">{currentIntegration.name}</Label>
          <Label className="text-subtitle mb-2">Platform: {currentIntegration.platform}</Label>
          <Label className="text-body mb-2">Status: {currentIntegration.status}</Label>
          <Label className="text-body mb-2">Last Sync: {currentIntegration.lastSync || 'Never'}</Label>
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Sync Status</Label>
          {syncStatus.map(status => (
            <StackLayout key={status.id} className="mb-2">
              <Label className="text-body">Product ID: {status.productId}</Label>
              <Label className="text-body">Status: {status.status}</Label>
              <Label className="text-body">Last Sync: {status.lastSync}</Label>
              {status.error && (
                <Label className="text-error">Error: {status.error}</Label>
              )}
            </StackLayout>
          ))}
        </StackLayout>

        <Button 
          className="btn-primary mt-4" 
          text="Edit Integration" 
          onTap={() => navigation.navigate("IntegrationSetup", { platform: currentIntegration.platform })} 
        />
      </StackLayout>
    </ScrollView>
  );
}; 