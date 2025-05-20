import * as React from "react";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/slices/authSlice";
import { AuthStackParamList } from "../../components/navigation/AuthStack";
import { RootState, AppDispatch } from "../../store/store";
import { Dialogs } from "@nativescript/core";
import { 
  ScrollView, 
  FlexboxLayout, 
  StackLayout, 
  Label, 
  TextField, 
  Button 
} from "../../components/native/nativeElements";

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
  
  const dispatch = useDispatch<AppDispatch>();
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
    <ScrollView className="bg-primary100">
      <FlexboxLayout className="flex-column justify-center p-6">
        <StackLayout className="p-6 rounded-lg bg-surface">
          <Label className="text-title text-center mb-6">Create Your Account</Label>
          
          <StackLayout className="mb-4">
            <Label className="form-label">Full Name</Label>
            <TextField 
              className="form-input" 
              hint="Enter your full name"
              text={name}
              onTextChange={(e) => setName(e.value)}
            />
          </StackLayout>
          
          <StackLayout className="mb-4">
            <Label className="form-label">Email</Label>
            <TextField 
              className="form-input" 
              keyboardType="email"
              autocorrect={false}
              autocapitalizationType="none"
              hint="Enter your email"
              text={email}
              onTextChange={(e) => setEmail(e.value)}
            />
          </StackLayout>
          
          <StackLayout className="mb-4">
            <Label className="form-label">Store Name</Label>
            <TextField 
              className="form-input" 
              hint="Enter your store name"
              text={storeName}
              onTextChange={(e) => setStoreName(e.value)}
            />
          </StackLayout>
          
          <StackLayout className="mb-4">
            <Label className="form-label">Password</Label>
            <TextField 
              className="form-input" 
              secure={true}
              hint="Create a password"
              text={password}
              onTextChange={(e) => setPassword(e.value)}
            />
          </StackLayout>
          
          <StackLayout className="mb-6">
            <Label className="form-label">Confirm Password</Label>
            <TextField 
              className="form-input" 
              secure={true}
              hint="Confirm your password"
              text={confirmPassword}
              onTextChange={(e) => setConfirmPassword(e.value)}
            />
          </StackLayout>
          
          <Button 
            className="btn-primary mb-4" 
            text={isLoading ? "Creating Account..." : "Create Account"}
            isEnabled={!isLoading}
            onTap={handleSignUp}
          />
          
          <StackLayout orientation="horizontal" className="justify-center">
            <Label className="text-body">Already have an account? </Label>
            <Button 
              className="text-body text-primary p-0 m-0 border-0 bg-transparent"
              text="Log In"
              onTap={() => navigation.navigate("Login")}
            />
          </StackLayout>
        </StackLayout>
      </FlexboxLayout>
    </ScrollView>
  );
}