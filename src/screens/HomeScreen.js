import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Switch,
  Alert,
  FlatList,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../contexts/AuthContext';
import { TaskContext } from '../contexts/TaskContext';
import { Colors } from '../styles/Colors';
import TodayTasksScreen from './TodayTasksScreen';
import CompletedTasksScreen from './CompletedTasksScreen';
import FutureTasksScreen from './FutureTasksScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: {
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          paddingBottom: 5,
        },
      }}
    >
      <Tab.Screen
        name="Today"
        component={TodayTasksScreen}
        options={{
          title: "Today's Tasks",
          tabBarLabel: 'Today',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>📋</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Completed"
        component={CompletedTasksScreen}
        options={{
          title: 'Completed Tasks',
          tabBarLabel: 'Completed',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>✅</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Future"
        component={FutureTasksScreen}
        options={{
          title: 'Future Plans',
          tabBarLabel: 'Future',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>🎯</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
