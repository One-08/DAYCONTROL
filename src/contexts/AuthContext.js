import React from 'react';

export const AuthContext = React.createContext({
  state: { isLoading: true, isSignout: false, user: null },
  authContext: {
    signInWithGoogle: async () => {},
    signInWithApple: async () => {},
    signOut: async () => {},
  },
});
