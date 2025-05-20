import * as React from "react";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { AuthStackParamList } from "../../components/navigation/AuthStack";
import { StackLayout, Label, Button, TextField } from "../../components/native/nativeElements";
import { Dialogs } from "@nativescript/core";

export const ResetPasswordScreen = ({ route, navigation }: {
  route: RouteProp<AuthStackParamList, "ResetPassword">,
  navigation: FrameNavigationProp<AuthStackParamList, "ResetPassword">
}) => {
  const { token } = route.params;
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      Dialogs.alert({ title: "Error", message: "Please fill in all fields.", okButtonText: "OK" });
      return;
    }

    if (password !== confirmPassword) {
      Dialogs.alert({ title: "Error", message: "Passwords do not match.", okButtonText: "OK" });
      return;
    }

    setIsLoading(true);
    try {
      // Add your password reset API call here
      await new Promise(resolve => setTimeout(resolve, 1000));
      Dialogs.alert({ 
        title: "Success", 
        message: "Password has been reset successfully.", 
        okButtonText: "OK" 
      });
      navigation.navigate("Login");
    } catch (error) {
      Dialogs.alert({ 
        title: "Error", 
        message: "Failed to reset password. Please try again.", 
        okButtonText: "OK" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StackLayout className="p-4">
      <Label className="text-title mb-4">Reset Password</Label>
      <Label className="text-body mb-4">Enter your new password below.</Label>
      
      <TextField
        className="form-input mb-4"
        hint="New Password"
        text={password}
        onTextChange={(e) => setPassword(e.value)}
        secure={true}
      />

      <TextField
        className="form-input mb-4"
        hint="Confirm Password"
        text={confirmPassword}
        onTextChange={(e) => setConfirmPassword(e.value)}
        secure={true}
      />

      <Button 
        className="btn-primary mb-2" 
        text={isLoading ? "Resetting..." : "Reset Password"} 
        onTap={handleSubmit}
        isEnabled={!isLoading}
      />
      
      <Button 
        className="btn-outline" 
        text="Back to Login" 
        onTap={() => navigation.navigate("Login")}
        isEnabled={!isLoading}
      />
    </StackLayout>
  );
}; 