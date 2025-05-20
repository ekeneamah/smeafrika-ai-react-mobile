import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/slices/authSlice";
import { AuthStackParamList } from "../../components/navigation/AuthStack";
import { RootState } from "../../store/store";
import { colors } from "../../theme/colors";
import { Dialogs } from "@nativescript/core";

type SignUpScreenProps = {
  route: RouteProp<AuthStackParamList, "SignUp">,
  navigation: FrameNavigationProp<AuthStackParamList, "SignUp">,
};

export function SignUpScreen({ navigation }: SignUpScreenProps) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [storeName, setStoreName] = React.useState("");
  
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  
  React.useEffect(() => {
    if (error) {
      Dialogs.alert({
        title: "Registration Failed",
        message: error,
        okButtonText: "OK"
      });
    }
  }, [error]);

  const handleSignUp = async () => {
    // Validate inputs
    if (!name.trim() || !email.trim() || !password.trim() || !storeName.trim()) {
      Dialogs.alert({
        title: "Invalid Input",
        message: "Please fill in all required fields",
        okButtonText: "OK"
      });
      return;
    }
    
    if (password !== confirmPassword) {
      Dialogs.alert({
        title: "Password Mismatch",
        message: "Passwords do not match",
        okButtonText: "OK"
      });
      return;
    }
    
    dispatch(register({ name, email, password, storeName }));
  };

  return (
    <scrollView class="bg-primary100">
      <flexboxLayout class="flex-column justify-center p-6">
        <stackLayout class="p-6 rounded-lg bg-surface">
          <label class="text-title text-center mb-6">Create Your Account</label>
          
          <stackLayout class="mb-4">
            <label class="form-label">Full Name</label>
            <textField 
              class="form-input" 
              hint="Enter your full name"
              text={name}
              onTextChange={(e) => setName(e.value)}
            />
          </stackLayout>
          
          <stackLayout class="mb-4">
            <label class="form-label">Email</label>
            <textField 
              class="form-input" 
              keyboardType="email"
              autocorrect={false}
              autocapitalizationType="none"
              hint="Enter your email"
              text={email}
              onTextChange={(e) => setEmail(e.value)}
            />
          </stackLayout>
          
          <stackLayout class="mb-4">
            <label class="form-label">Store Name</label>
            <textField 
              class="form-input" 
              hint="Enter your store name"
              text={storeName}
              onTextChange={(e) => setStoreName(e.value)}
            />
          </stackLayout>
          
          <stackLayout class="mb-4">
            <label class="form-label">Password</label>
            <textField 
              class="form-input" 
              secure={true}
              hint="Create a password"
              text={password}
              onTextChange={(e) => setPassword(e.value)}
            />
          </stackLayout>
          
          <stackLayout class="mb-6">
            <label class="form-label">Confirm Password</label>
            <textField 
              class="form-input" 
              secure={true}
              hint="Confirm your password"
              text={confirmPassword}
              onTextChange={(e) => setConfirmPassword(e.value)}
            />
          </stackLayout>
          
          <button 
            class="btn-primary mb-4" 
            isEnabled={!isLoading}
            onTap={handleSignUp}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
          
          <stackLayout orientation="horizontal" class="justify-center">
            <label class="text-body">Already have an account? </label>
            <button 
              class="text-body text-primary p-0 m-0 border-0 bg-transparent"
              onTap={() => navigation.navigate("Login")}
            >
              Log In
            </button>
          </stackLayout>
        </stackLayout>
      </flexboxLayout>
    </scrollView>
  );
}