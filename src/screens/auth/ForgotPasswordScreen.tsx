import * as React from "react";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { AuthStackParamList } from "../../components/navigation/AuthStack";
import { StackLayout, Label, Button, TextField } from "../../components/native/nativeElements";
import { Dialogs } from "@nativescript/core";

export const ForgotPasswordScreen = ({ navigation }: {
  route: RouteProp<AuthStackParamList, "ForgotPassword">,
  navigation: FrameNavigationProp<AuthStackParamList, "ForgotPassword">
}) => {
  const [email, setEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async () => {
    if (!email) {
      Dialogs.alert({ title: "Error", message: "Please enter your email address.", okButtonText: "OK" });
      return;
    }

    setIsLoading(true);
    try {
      // Add your password reset API call here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      Dialogs.alert({ 
        title: "Success", 
        message: "Password reset instructions have been sent to your email.", 
        okButtonText: "OK" 
      });
      navigation.goBack();
    } catch (error) {
      Dialogs.alert({ 
        title: "Error", 
        message: "Failed to send reset instructions. Please try again.", 
        okButtonText: "OK" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StackLayout className="p-4">
      <Label className="text-title mb-4">Forgot Password</Label>
      <Label className="text-body mb-4">Enter your email address and we'll send you instructions to reset your password.</Label>
      
      <TextField
        className="form-input mb-4"
        hint="Email Address"
        text={email}
        onTextChange={(e) => setEmail(e.value)}
        keyboardType="email"
        autocorrect={false}
        autocapitalizationType="none"
      />

      <Button 
        className="btn-primary mb-2" 
        text={isLoading ? "Sending..." : "Send Reset Instructions"} 
        onTap={handleSubmit}
        isEnabled={!isLoading}
      />
      
      <Button 
        className="btn-outline" 
        text="Back to Login" 
        onTap={() => navigation.goBack()}
        isEnabled={!isLoading}
      />
    </StackLayout>
  );
}; 