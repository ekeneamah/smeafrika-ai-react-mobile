import * as React from "react";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { AuthStackParamList } from "../../components/navigation/AuthStack";
import { 
  FlexboxLayout, 
  StackLayout, 
  Label, 
  Button, 
  Image 
} from "../../components/native/nativeElements";

type WelcomeScreenProps = {
  route: RouteProp<AuthStackParamList, "Welcome">,
  navigation: FrameNavigationProp<AuthStackParamList, "Welcome">,
};

export function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  return (
    <FlexboxLayout className="h-full flex-column justify-center p-6 bg-primary100">
      <StackLayout className="p-6 rounded-lg bg-surface">
        <Image src="~/assets/logo.png" className="h-24 w-24 self-center mb-4" stretch="aspectFit" />
        
        <Label className="text-title text-center mb-2">Welcome to Vendor App</Label>
        <Label className="text-body text-center mb-6">Manage your store, track analytics, and grow your business all in one place</Label>
        
        <Button 
          className="btn-primary mb-4"
          text="Log In"
          onTap={() => navigation.navigate("Login")}
        />
        
        <Button 
          className="btn-outline"
          text="Create Account"
          onTap={() => navigation.navigate("SignUp")}
        />
        
        <Label className="text-body text-center mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Label>
      </StackLayout>
    </FlexboxLayout>
  );
}