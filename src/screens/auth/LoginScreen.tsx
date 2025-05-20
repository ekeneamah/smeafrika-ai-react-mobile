import * as React from "react";
import { BiometricService } from "../../services/biometricService";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/authSlice";
import { RootState } from "../../store/store";
import { Dialogs } from "@nativescript/core";

export function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();
  const { isLoading, error, biometricAvailable } = useSelector((state: RootState) => state.auth);

  const handleBiometricLogin = async () => {
    const verified = await BiometricService.verify('Log in to Vendor App');
    if (verified) {
      // Get stored credentials and login
      // This is simplified - you'd need to implement secure credential storage
      dispatch(login({ email: 'stored@email.com', password: 'storedPassword' }));
    }
  };

  return (
    <flexboxLayout class="h-full flex-column justify-center p-6 bg-primary100">
      <stackLayout class="p-6 rounded-lg bg-surface">
        <label class="text-title text-center mb-6">Log In to Your Account</label>
        
        {biometricAvailable && (
          <button 
            class="btn-outline mb-4"
            onTap={handleBiometricLogin}
          >
            Login with Biometrics
          </button>
        )}
        
        {/* Rest of the login form */}
      </stackLayout>
    </flexboxLayout>
  );
}