import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential,
  sendPasswordResetEmail,
  updateProfile,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';
import { auth } from './init';

// Types
export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

export interface SignUpData {
  email: string;
  password: string;
  displayName?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

// Convert Firebase User to AuthUser
const convertFirebaseUser = (user: User): AuthUser => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
  emailVerified: user.emailVerified,
});

// Authentication functions
export const signUp = async (data: SignUpData): Promise<AuthUser> => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    if (data.displayName) {
      await updateProfile(userCredential.user, {
        displayName: data.displayName,
      });
    }

    return convertFirebaseUser(userCredential.user);
  } catch (error) {
    throw new Error(`Sign up failed: ${error}`);
  }
};

export const signIn = async (data: SignInData): Promise<AuthUser> => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    return convertFirebaseUser(userCredential.user);
  } catch (error) {
    throw new Error(`Sign in failed: ${error}`);
  }
};

export const logOut = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(`Sign out failed: ${error}`);
  }
};

export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw new Error(`Password reset failed: ${error}`);
  }
};

export const updateUserProfile = async (data: {
  displayName?: string;
  photoURL?: string;
}): Promise<void> => {
  if (!auth.currentUser) {
    throw new Error('No user is currently signed in');
  }

  try {
    await updateProfile(auth.currentUser, data);
  } catch (error) {
    throw new Error(`Profile update failed: ${error}`);
  }
};

export const updateUserPassword = async (
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  if (!auth.currentUser || !auth.currentUser.email) {
    throw new Error('No user is currently signed in');
  }

  try {
    // Reauthenticate user before updating password
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      currentPassword
    );
    await reauthenticateWithCredential(auth.currentUser, credential);
    await updatePassword(auth.currentUser, newPassword);
  } catch (error) {
    throw new Error(`Password update failed: ${error}`);
  }
};

// Auth state listener
export const onAuthStateChange = (callback: (user: AuthUser | null) => void): (() => void) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user ? convertFirebaseUser(user) : null);
  });
};

// Get current user
export const getCurrentUser = (): AuthUser | null => {
  return auth.currentUser ? convertFirebaseUser(auth.currentUser) : null;
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!auth.currentUser;
}; 