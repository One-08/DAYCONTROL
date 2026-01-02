import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTasksForDate } from '../database/db';

const NOTIFICATION_TASK = 'TASK_NOTIFICATION_TASK';

export const setupNotifications = async () => {
  try {
    // Request permissions
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      console.log('Notification permissions not granted');
      return;
    }

    // Register background task
    TaskManager.defineTask(NOTIFICATION_TASK, async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (!user) return;

        const parsedUser = JSON.parse(user);
        const today = new Date().toISOString().split('T')[0];

        const tasks = await getTasksForDate(parsedUser.id, today);
        const incompleteTasks = tasks.filter((t) => !t.completed);

        if (incompleteTasks.length > 0) {
          const firstTask = incompleteTasks[0];
          await Notifications.scheduleNotificationAsync({
            content: {
              title: 'Task Reminder',
              body: `Complete: ${firstTask.title}`,
              sound: 'default',
              badge: incompleteTasks.length,
            },
            trigger: { seconds: 1 },
          });
        }
      } catch (error) {
        console.error('Error in notification task:', error);
      }
    });

    // Schedule notifications for 9 AM every day
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Good Morning!',
        body: 'Check your tasks for today',
        sound: 'default',
      },
      trigger: {
        hour: 9,
        minute: 0,
        repeats: true,
      },
    });
  } catch (error) {
    console.error('Error setting up notifications:', error);
  }
};

export const sendTaskNotification = async (title, body) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: 'default',
      },
      trigger: { seconds: 1 },
    });
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

export const scheduleTaskReminder = async (taskId, dueDate, taskTitle) => {
  try {
    const notificationTime = new Date(dueDate);
    notificationTime.setHours(9, 0, 0, 0);

    if (notificationTime > new Date()) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Task Due Today',
          body: taskTitle,
          sound: 'default',
          data: { taskId },
        },
        trigger: notificationTime,
      });
    }
  } catch (error) {
    console.error('Error scheduling task reminder:', error);
  }
};

export const cancelNotification = async (notificationId) => {
  try {
    await Notifications.dismissNotificationAsync(notificationId);
  } catch (error) {
    console.error('Error canceling notification:', error);
  }
};
