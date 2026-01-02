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
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { TaskContext } from '../contexts/TaskContext';
import { AuthContext } from '../contexts/AuthContext';
import { Colors } from '../styles/Colors';
import TaskCard from '../components/TaskCard';
import AddTaskButton from '../components/AddTaskButton';

export default function TodayTasksScreen() {
  const taskContext = useContext(TaskContext);
  const authContext = useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [priority, setPriority] = useState(0);
  const [taskCount, setTaskCount] = useState(0);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    taskContext.loadTasks(today);

    // Set up auto-refresh
    const interval = setInterval(() => {
      taskContext.loadTasks(today);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleAddTask = async () => {
    if (!taskTitle.trim()) {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }

    if (taskContext.state.tasks.length >= 5) {
      Alert.alert('Limit Reached', 'You can add a maximum of 5 tasks per day');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    await taskContext.addTask({
      title: taskTitle,
      description: taskDescription,
      dueDate: today,
      priority,
      isRecurring: false,
    });

    setTaskTitle('');
    setTaskDescription('');
    setPriority(0);
    setIsModalVisible(false);
  };

  const handleCompleteTask = (taskId) => {
    taskContext.completeTask(taskId);
  };

  const handleDeleteTask = (taskId) => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Delete',
        onPress: () => taskContext.deleteTask(taskId),
        style: 'destructive',
      },
    ]);
  };

  const incompleteTasks = taskContext.state.tasks.filter((t) => !t.completed);
  const completedTodayCount = taskContext.state.completedTasks.length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
        <View style={styles.stats}>
          <Text style={styles.statText}>
            {incompleteTasks.length} pending
          </Text>
          <Text style={styles.statSeparator}>•</Text>
          <Text style={styles.statText}>
            {completedTodayCount} completed
          </Text>
        </View>
      </View>

      {taskContext.state.loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : incompleteTasks.length === 0 && completedTodayCount === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tasks yet</Text>
          <Text style={styles.emptySubtext}>
            Tap the button below to add your first task
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.taskList}>
          {incompleteTasks.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>Today's Tasks</Text>
              {incompleteTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onComplete={() => handleCompleteTask(task.id)}
                  onDelete={() => handleDeleteTask(task.id)}
                />
              ))}
            </View>
          )}

          {completedTodayCount > 0 && (
            <View style={styles.completedSection}>
              <Text style={styles.sectionTitle}>Completed Today</Text>
              {taskContext.state.completedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  isCompleted={true}
                  onDelete={() => handleDeleteTask(task.id)}
                />
              ))}
            </View>
          )}
        </ScrollView>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Text style={styles.cancelButton}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Add Task</Text>
              <TouchableOpacity onPress={handleAddTask}>
                <Text style={styles.addButton}>Add</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Task title"
              value={taskTitle}
              onChangeText={setTaskTitle}
              placeholderTextColor={Colors.textSecondary}
            />

            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Description (optional)"
              value={taskDescription}
              onChangeText={setTaskDescription}
              placeholderTextColor={Colors.textSecondary}
              multiline
              numberOfLines={3}
            />

            <View style={styles.priorityContainer}>
              <Text style={styles.priorityLabel}>Priority</Text>
              <View style={styles.priorityButtons}>
                {[
                  { level: 0, label: 'Low', color: '#4CAF50' },
                  { level: 1, label: 'Medium', color: '#FF9800' },
                  { level: 2, label: 'High', color: '#FF5252' },
                ].map((item) => (
                  <TouchableOpacity
                    key={item.level}
                    style={[
                      styles.priorityButton,
                      priority === item.level && {
                        backgroundColor: item.color,
                      },
                    ]}
                    onPress={() => setPriority(item.level)}
                  >
                    <Text
                      style={[
                        styles.priorityButtonText,
                        priority === item.level && { color: 'white' },
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <Text style={styles.taskCountInfo}>
              {taskContext.state.tasks.length}/5 tasks added today
            </Text>
          </View>
        </View>
      </Modal>

      <AddTaskButton onPress={() => setIsModalVisible(true)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  date: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  statSeparator: {
    marginHorizontal: 8,
    color: Colors.border,
  },
  taskList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 12,
  },
  completedSection: {
    marginTop: 24,
    paddingBottom: 80,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingBottom: 32,
    paddingTop: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cancelButton: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  addButton: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
    fontSize: 16,
    color: Colors.text,
  },
  descriptionInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  priorityContainer: {
    marginBottom: 16,
  },
  priorityLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  priorityButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    alignItems: 'center',
  },
  priorityButtonText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  taskCountInfo: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 12,
  },
});
