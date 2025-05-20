import React, { useEffect } from 'react';
import { AppContainer } from './components/AppContainer';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { NotificationService } from './services/notificationService';
import { BiometricService } from './services/biometricService';

export default function App() {
  useEffect(() => {
    const initializeApp = async () => {
      // Initialize notifications
      await NotificationService.initialize();
      
      // Check biometric availability
      const biometricAvailable = await BiometricService.isAvailable();
      if (biometricAvailable) {
        // Enable biometric login if available
        store.dispatch({ type: 'auth/setBiometricAvailable', payload: true });
      }
    };
    
    initializeApp();
  }, []);

  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}