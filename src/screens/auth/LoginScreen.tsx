import * as React from "react";
import { BiometricService } from "../../services/biometricService";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/authSlice";
import { RootState, AppDispatch } from "../../store/store";
import { Dialogs } from "@nativescript/core";
import { 
  FlexboxLayout, 
  StackLayout, 
  Label, 
  Button 
} from "../../components/native/nativeElements";

export async function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  const biometricAvailable = BiometricService.isAvailable();

  const handleBiometricLogin = async () => {
    const verified = await BiometricService.verify('Log in to Vendor App');
    if (verified) {
      // Get stored credentials and login
      // This is simplified - you'd need to implement secure credential storage
      dispatch(login({ email: 'stored@email.com', password: 'storedPassword' }));
    }
  };

  return (
    <FlexboxLayout className="h-full flex-column justify-center p-6 bg-primary100">
      <StackLayout className="p-6 rounded-lg bg-surface">
        <Label className="text-title text-center mb-6">Log In to Your Account</Label>
        
        {await biometricAvailable && (
          <Button 
            className="btn-outline mb-4"
            text="Login with Biometrics"
            onTap={handleBiometricLogin}
          />
        )}
        
        {/* Rest of the login form */}
      </StackLayout>
    </FlexboxLayout>
  );
}