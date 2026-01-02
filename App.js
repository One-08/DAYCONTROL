import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthContext } from './src/contexts/AuthContext';
import { TaskContext } from './src/contexts/TaskContext';
import { useAuth } from './src/hooks/useAuth';
import { useTask } from './src/hooks/useTask';
import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import { initializeDatabase } from './src/database/db';
import { setupNotifications } from './src/services/NotificationService';

const Stack = createNativeStackNavigator();

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Web fallback component
function WebFallback() {
  return (
    <View style={[styles.container, { justifyContent: 'center' }]}>
      <Text style={styles.webTitle}>📋 DayControl</Text>
      <Text style={styles.webSubtitle}>Daily Task Management</Text>
      <Text style={styles.webMessage}>
        For the best experience, please:
      </Text>
      <Text style={styles.webMessage}>
        • Use this app on Android or iOS with Expo Go
      </Text>
      <Text style={styles.webMessage}>
        • Or scan the QR code above with your phone
      </Text>
      <Text style={styles.webNote}>
        Web version features are limited. Mobile experience is recommended!
      </Text>
    </View>
  );
}

export default function App() {
  const [isWeb, setIsWeb] = useState(false);

  useEffect(() => {
    initializeDatabase();
    setupNotifications();
    setIsWeb(Platform.OS === 'web');
  }, []);

  const authContext = useAuth();
  const taskContext = useTask();

  if (authContext.state.isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // Show web fallback
  if (isWeb) {
    return (
      <SafeAreaProvider>
        <WebFallback />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <AuthContext.Provider value={authContext}>
        <TaskContext.Provider value={taskContext}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                animationEnabled: true,
              }}
            >
              {authContext.state.user == null ? (
                <Stack.Screen
                  name="Auth"
                  component={AuthScreen}
                  options={{
                    animationEnabled: false,
                  }}
                />
              ) : (
                <Stack.Screen name="Home" component={HomeScreen} />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </TaskContext.Provider>
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  webTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 10,
    textAlign: 'center',
  },
  webSubtitle: {
    fontSize: 18,
    color: '#999',
    marginBottom: 30,
    textAlign: 'center',
  },
  webMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    textAlign: 'center',
    lineHeight: 20,
  },
  webNote: {
    fontSize: 13,
    color: '#999',
    marginTop: 30,
    textAlign: 'center',
    maxWidth: 300,
    lineHeight: 18,
  },
  loadingText: {
    fontSize: 16,
    color: '#999',
  },
});
