import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { IntegrationsStackParamList } from "../../components/navigation/IntegrationsTabNavigator";
import { ScrollView, StackLayout, GridLayout, Label, Button } from "../../components/native/nativeElements";
import { RootState, AppDispatch } from "../../store/store";
import { deleteIntegration, fetchIntegrations } from "../../store/slices/integrationSlice";
import { Dialogs } from "@nativescript/core";

export const IntegrationListScreen = ({ navigation }: {
  navigation: FrameNavigationProp<IntegrationsStackParamList, "IntegrationList">
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { integrations, isLoading } = useSelector((state: RootState) => state.integrations);

  React.useEffect(() => {
    dispatch(fetchIntegrations());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    const confirmed = await Dialogs.confirm({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this integration?",
      okButtonText: "Delete",
      cancelButtonText: "Cancel"
    });
    if (!confirmed) return;
    try {
      await dispatch(deleteIntegration(id));
    } catch (error) {
      Dialogs.alert({ title: "Error", message: "Failed to delete integration.", okButtonText: "OK" });
    }
  };

  return (
    <ScrollView className="bg-background">
      <StackLayout className="p-4">
        {integrations.map(integration => (
          <StackLayout key={integration.id} className="card mb-4">
            <GridLayout columns="*, auto" rows="auto, auto">
              <Label col={0} row={0} className="text-subtitle">{integration.name}</Label>
              <Label col={1} row={0} className={`text-${integration.status}`}>
                {integration.status}
              </Label>
              <Label col={0} row={1} className="text-body">{integration.platform}</Label>
            </GridLayout>
            <GridLayout columns="*, *, *" className="mt-2">
              <Button 
                col={0} 
                text="Details" 
                className="btn-outline" 
                onTap={() => navigation.navigate("IntegrationDetail", { integrationId: integration.id })} 
              />
              <Button 
                col={1} 
                text="Setup" 
                className="btn-outline" 
                onTap={() => navigation.navigate("IntegrationSetup", { platform: integration.platform })} 
              />
              <Button 
                col={2} 
                text="Sync" 
                className="btn-outline" 
                onTap={() => navigation.navigate("IntegrationSync", { integrationId: integration.id })} 
              />
            </GridLayout>
            <Button 
              text="Delete" 
              className="text-error text-sm mt-2" 
              onTap={() => handleDelete(integration.id)} 
            />
          </StackLayout>
        ))}

        <Button 
          className="btn-primary mt-4" 
          text="Add Integration" 
          onTap={() => navigation.navigate("IntegrationSetup", { platform: "example" } )} 
        />
      </StackLayout>
    </ScrollView>
  );
}; 