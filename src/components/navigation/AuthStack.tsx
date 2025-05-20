import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { WelcomeScreen } from "../../screens/auth/WelcomeScreen";
import { LoginScreen } from "../../screens/auth/LoginScreen";
import { SignUpScreen } from "../../screens/auth/SignUpScreen";
import { ForgotPasswordScreen } from "../../screens/auth/ForgotPasswordScreen";
import { ResetPasswordScreen } from "../../screens/auth/ResetPasswordScreen";

const StackNavigator = stackNavigatorFactory();

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  ResetPassword: { token: string };
};

export const AuthStack = () => (
  <StackNavigator.Navigator
    initialRouteName="Welcome"
    screenOptions={{
      headerShown: false,
    }}
  >
    <StackNavigator.Screen name="Welcome" component={WelcomeScreen} />
    <StackNavigator.Screen name="Login" component={LoginScreen} />
    <StackNavigator.Screen name="SignUp" component={SignUpScreen} />
    <StackNavigator.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <StackNavigator.Screen name="ResetPassword" component={ResetPasswordScreen} />
  </StackNavigator.Navigator>
);