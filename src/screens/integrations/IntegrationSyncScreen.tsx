import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { IntegrationsStackParamList } from "../../components/navigation/IntegrationsTabNavigator";
import { ScrollView, StackLayout, Label, Button, GridLayout } from "../../components/native/nativeElements";
import { RootState, AppDispatch } from "../../store/store";
import { fetchSyncStatus, syncProduct } from "../../store/slices/integrationSlice";
import { Dialogs } from "@nativescript/core";

export const IntegrationSyncScreen = ({ route, navigation }: {
  route: RouteProp<IntegrationsStackParamList, "IntegrationSync">,
  navigation: FrameNavigationProp<IntegrationsStackParamList, "IntegrationSync">
}) => {
  const { integrationId } = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const { syncStatus, isLoading } = useSelector((state: RootState) => state.integrations);

  React.useEffect(() => {
    dispatch(fetchSyncStatus(integrationId));
  }, [dispatch, integrationId]);

  const handleSync = async (productId: string) => {
    try {
      await dispatch(syncProduct({ integrationId, productId }));
      Dialogs.alert({ 
        title: "Success", 
        message: "Product sync initiated.", 
        okButtonText: "OK" 
      });
    } catch (err) {
      Dialogs.alert({ 
        title: "Error", 
        message: "Failed to sync product.", 
        okButtonText: "OK" 
      });
    }
  };

  return (
    <ScrollView className="bg-background">
      <StackLayout className="p-4">
        <Label className="text-title mb-4">Sync Status</Label>
        
        {syncStatus.map(status => (
          <StackLayout key={status.id} className="card mb-4">
            <GridLayout columns="*, auto" rows="auto, auto">
              <Label col={0} row={0} className="text-subtitle">Product ID: {status.productId}</Label>
              <Label col={1} row={0} className={`text-${status.status}`}>
                {status.status}
              </Label>
              <Label col={0} row={1} className="text-body">Last Sync: {status.lastSync}</Label>
            </GridLayout>
            {status.error && (
              <Label className="text-error mt-2">{status.error}</Label>
            )}
            <Button 
              className="btn-outline mt-2" 
              text="Sync Now" 
              onTap={() => handleSync(status.productId)} 
            />
          </StackLayout>
        ))}

        <Button 
          className="btn-primary mt-4" 
          text="Sync All Products" 
          onTap={() => {/* TODO: Implement sync all */}} 
        />
      </StackLayout>
    </ScrollView>
  );
}; 