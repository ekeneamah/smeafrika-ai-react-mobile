import { Biometrics } from '@nativescript/biometrics';

export class BiometricService {
  static async isAvailable(): Promise<boolean> {
    const biometrics = new Biometrics();
    return await biometrics.isAvailable();
  }

  static async verify(message: string): Promise<boolean> {
    const biometrics = new Biometrics();
    try {
      const result = await biometrics.verifyFingerprint({
        message,
        fallbackMessage: 'Please use your device password'
      });
      return result.code === 0;
    } catch (error) {
      console.error('Biometric verification failed:', error);
      return false;
    }
  }
}