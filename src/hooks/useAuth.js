import { useReducer, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStoredUser, signOut } from '../services/AuthService';

const initialState = {
  isLoading: true,
  isSignout: false,
  user: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...state,
        isSignout: false,
        user: action.payload,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isSignout: true,
        user: null,
      };
    default:
      return state;
  }
};

export const useAuth = () => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const user = await getStoredUser();
        dispatch({ type: 'RESTORE_TOKEN', payload: user });
      } catch (error) {
        console.error('Error restoring token:', error);
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = {
    signInWithGoogle: useCallback(async (user) => {
      dispatch({ type: 'SIGN_IN', payload: user });
    }, []),
    signInWithApple: useCallback(async (user) => {
      dispatch({ type: 'SIGN_IN', payload: user });
    }, []),
    signOut: useCallback(async () => {
      await signOut();
      dispatch({ type: 'SIGN_OUT' });
    }, []),
  };

  return { state, ...authContext };
};
