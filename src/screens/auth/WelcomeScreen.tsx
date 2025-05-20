import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { AuthStackParamList } from "../../components/navigation/AuthStack";
import { colors } from "../../theme/colors";

type WelcomeScreenProps = {
  route: RouteProp<AuthStackParamList, "Welcome">,
  navigation: FrameNavigationProp<AuthStackParamList, "Welcome">,
};

export function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  return (
    <flexboxLayout class="h-full flex-column justify-center p-6 bg-primary100">
      <stackLayout class="p-6 rounded-lg bg-surface">
        <image src="~/assets/logo.png" class="h-24 w-24 self-center mb-4" stretch="aspectFit" />
        
        <label class="text-title text-center mb-2">Welcome to Vendor App</label>
        <label class="text-body text-center mb-6">Manage your store, track analytics, and grow your business all in one place</label>
        
        <button 
          class="btn-primary mb-4"
          onTap={() => navigation.navigate("Login")}
        >
          Log In
        </button>
        
        <button 
          class="btn-outline"
          onTap={() => navigation.navigate("SignUp")}
        >
          Create Account
        </button>
        
        <label class="text-body text-center mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </label>
      </stackLayout>
    </flexboxLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    padding: 24,
    backgroundColor: colors.background,
  },
  card: {
    padding: 24,
    borderRadius: 16,
    backgroundColor: colors.surface,
  },
  logo: {
    height: 100,
    width: 100,
    alignSelf: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textPrimary,
    textAlign: "center",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 24,
  },
  loginButton: {
    backgroundColor: colors.primary,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  signupButton: {
    backgroundColor: "transparent",
    color: colors.primary,
    fontSize: 16,
    fontWeight: "bold",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    padding: 16,
    textAlign: "center",
  },
  terms: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 24,
  },
});