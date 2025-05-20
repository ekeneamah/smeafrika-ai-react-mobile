import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { IntegrationsStackParamList } from "../../components/navigation/IntegrationsTabNavigator";
import { ScrollView, StackLayout, Label, Button, TextField, Switch } from "../../components/native/nativeElements";
import { RootState, AppDispatch } from "../../store/store";
import { saveIntegration, fetchIntegrationById } from "../../store/slices/integrationSlice";
import { Dialogs } from "@nativescript/core";
import { Platform } from "../../types/integration";

export const IntegrationSetupScreen = ({ route, navigation }: {
  route: RouteProp<IntegrationsStackParamList, "IntegrationSetup">,
  navigation: FrameNavigationProp<IntegrationsStackParamList, "IntegrationSetup">
}) => {
  const { integrationId } = route.params || {};
  const dispatch = useDispatch<AppDispatch>();
  const { currentIntegration } = useSelector((state: RootState) => state.integrations);

  const [formData, setFormData] = React.useState({
    name: '',
    platform: 'amazon' as Platform,
    apiKey: '',
    secretKey: '',
    accessToken: '',
    refreshToken: '',
    autoSync: true,
    syncInterval: '24',
    defaultCategory: '',
    defaultShipping: ''
  });

  React.useEffect(() => {
    if (integrationId) {
      dispatch(fetchIntegrationById(integrationId));
    }
  }, [dispatch, integrationId]);

  React.useEffect(() => {
    if (currentIntegration) {
      setFormData({
        name: currentIntegration.name,
        platform: currentIntegration.platform,
        apiKey: currentIntegration.credentials.apiKey,
        secretKey: currentIntegration.credentials.secretKey,
        accessToken: currentIntegration.credentials.accessToken || '',
        refreshToken: currentIntegration.credentials.refreshToken || '',
        autoSync: currentIntegration.settings.autoSync,
        syncInterval: currentIntegration.settings.syncInterval.toString(),
        defaultCategory: currentIntegration.settings.defaultCategory || '',
        defaultShipping: currentIntegration.settings.defaultShipping || ''
      });
    }
  }, [currentIntegration]);

  const handleSubmit = async () => {
    if (!formData.name || !formData.apiKey || !formData.secretKey) {
      Dialogs.alert({ 
        title: "Validation Error", 
        message: "Please complete all required fields.", 
        okButtonText: "OK" 
      });
      return;
    }

    try {
      await dispatch(saveIntegration({
        id: integrationId,
        name: formData.name,
        platform: formData.platform,
        credentials: {
          apiKey: formData.apiKey,
          secretKey: formData.secretKey,
          accessToken: formData.accessToken,
          refreshToken: formData.refreshToken
        },
        settings: {
          autoSync: formData.autoSync,
          syncInterval: parseInt(formData.syncInterval),
          defaultCategory: formData.defaultCategory,
          defaultShipping: formData.defaultShipping
        }
      }));
      Dialogs.alert({ 
        title: "Success", 
        message: "Integration saved successfully.", 
        okButtonText: "OK" 
      });
      navigation.goBack();
    } catch (err) {
      Dialogs.alert({ 
        title: "Error", 
        message: "Failed to save integration.", 
        okButtonText: "OK" 
      });
    }
  };

  return (
    <ScrollView className="bg-background">
      <StackLayout className="p-4">
        <StackLayout className="card">
          <Label className="text-subtitle mb-2">Name</Label>
          <TextField 
            className="form-input" 
            text={formData.name}
            onTextChange={(e) => setFormData({ ...formData, name: e.value })}
            hint="Enter integration name"
          />
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Platform</Label>
          <segmentedBar selectedIndex={0} className="mb-2">
            <segmentedBarItem title="Amazon" />
            <segmentedBarItem title="eBay" />
            <segmentedBarItem title="Alibaba" />
            <segmentedBarItem title="Walmart" />
          </segmentedBar>
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">API Key</Label>
          <TextField 
            className="form-input" 
            text={formData.apiKey}
            onTextChange={(e) => setFormData({ ...formData, apiKey: e.value })}
            hint="Enter API key"
            secure
          />
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Secret Key</Label>
          <TextField 
            className="form-input" 
            text={formData.secretKey}
            onTextChange={(e) => setFormData({ ...formData, secretKey: e.value })}
            hint="Enter secret key"
            secure
          />
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Access Token</Label>
          <TextField 
            className="form-input" 
            text={formData.accessToken}
            onTextChange={(e) => setFormData({ ...formData, accessToken: e.value })}
            hint="Enter access token"
            secure
          />
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Refresh Token</Label>
          <TextField 
            className="form-input" 
            text={formData.refreshToken}
            onTextChange={(e) => setFormData({ ...formData, refreshToken: e.value })}
            hint="Enter refresh token"
            secure
          />
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Settings</Label>
          <Label className="text-body">Auto Sync</Label>
          <Switch checked={formData.autoSync} onCheckedChange={(e) => setFormData({ ...formData, autoSync: e.value })} />
          
          <Label className="text-body mt-2">Sync Interval (hours)</Label>
          <TextField 
            className="form-input" 
            text={formData.syncInterval}
            onTextChange={(e) => setFormData({ ...formData, syncInterval: e.value })}
            hint="Enter sync interval"
            keyboardType="number"
          />

          <Label className="text-body mt-2">Default Category</Label>
          <TextField 
            className="form-input" 
            text={formData.defaultCategory}
            onTextChange={(e) => setFormData({ ...formData, defaultCategory: e.value })}
            hint="Enter default category"
          />

          <Label className="text-body mt-2">Default Shipping</Label>
          <TextField 
            className="form-input" 
            text={formData.defaultShipping}
            onTextChange={(e) => setFormData({ ...formData, defaultShipping: e.value })}
            hint="Enter default shipping"
          />
        </StackLayout>

        <Button 
          className="btn-primary mt-4" 
          text={integrationId ? "Update Integration" : "Create Integration"} 
          onTap={handleSubmit} 
        />
      </StackLayout>
    </ScrollView>
  );
}; 