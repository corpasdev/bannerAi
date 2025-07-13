import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration types
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

// Environment detection
const getEnvironment = (): 'development' | 'staging' | 'production' => {
  const nodeEnv = import.meta.env.MODE;
  
  if (nodeEnv === 'development') return 'development';
  if (nodeEnv === 'staging') return 'staging';
  return 'production';
};

// Get Firebase config based on environment
const getFirebaseConfig = (): FirebaseConfig => {
  const env = getEnvironment();
  
  const configs: Record<string, FirebaseConfig> = {
    development: {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY_DEV || '',
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN_DEV || '',
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID_DEV || '',
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET_DEV || '',
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID_DEV || '',
      appId: import.meta.env.VITE_FIREBASE_APP_ID_DEV || '',
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID_DEV,
    },
    staging: {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY_STAGING || '',
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN_STAGING || '',
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID_STAGING || '',
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET_STAGING || '',
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID_STAGING || '',
      appId: import.meta.env.VITE_FIREBASE_APP_ID_STAGING || '',
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID_STAGING,
    },
    production: {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY_PROD || '',
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN_PROD || '',
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID_PROD || '',
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET_PROD || '',
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID_PROD || '',
      appId: import.meta.env.VITE_FIREBASE_APP_ID_PROD || '',
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID_PROD,
    },
  };

  const config = configs[env];
  
  if (!config.apiKey || !config.authDomain || !config.projectId) {
    throw new Error(`Firebase configuration missing for environment: ${env}`);
  }

  return config;
};

// Initialize Firebase
const firebaseConfig = getFirebaseConfig();
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

// Export current environment for debugging
export const currentEnvironment = getEnvironment(); 