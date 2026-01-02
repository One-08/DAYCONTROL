import * as Google from 'expo-auth-session/providers/google';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveUser, getUserByEmail } from '../database/db';

const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';

export const useGoogleSignIn = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: GOOGLE_CLIENT_ID,
    iosClientId: GOOGLE_CLIENT_ID,
    androidClientId: GOOGLE_CLIENT_ID,
    webClientId: GOOGLE_CLIENT_ID,
  });

  const signInWithGoogle = async () => {
    try {
      const result = await promptAsync();
      if (result?.type === 'success') {
        const token = result.authentication?.accessToken;
        
        // Get user info from Google
        const userInfoResponse = await fetch(
          'https://www.googleapis.com/userinfo/v2/me',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const userInfo = await userInfoResponse.json();
        
        // Save user to database or update
        let user = await getUserByEmail(userInfo.email);
        if (!user) {
          const userId = await saveUser({
            email: userInfo.email,
            name: userInfo.name,
            provider: 'google',
          });
          user = { id: userId, email: userInfo.email, name: userInfo.name };
        }

        // Save to AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify(user));
        return user;
      }
    } catch (error) {
      console.error('Google Sign-In error:', error);
      throw error;
    }
  };

  return { signInWithGoogle };
};

export const signInWithApple = async () => {
  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });

    // Decode the credential to get user info
    const email = credential.email;
    const name = credential.fullName
      ? `${credential.fullName.givenName || ''} ${credential.fullName.familyName || ''}`
      : 'Apple User';

    // Save user to database or update
    let user = await getUserByEmail(email);
    if (!user) {
      const userId = await saveUser({
        email,
        name,
        provider: 'apple',
      });
      user = { id: userId, email, name };
    }

    // Save to AsyncStorage
    await AsyncStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error) {
    if (error.code === 'ERR_CANCELED') {
      console.log('User canceled Apple Sign-In');
    } else {
      console.error('Apple Sign-In error:', error);
    }
    throw error;
  }
};

export const signOut = async () => {
  try {
    await AsyncStorage.removeItem('user');
    return true;
  } catch (error) {
    console.error('Sign-out error:', error);
    return false;
  }
};

export const getStoredUser = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error getting stored user:', error);
    return null;
  }
};
