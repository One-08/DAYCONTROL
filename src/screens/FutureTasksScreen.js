import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  ActivityIndicator,
} from 'react-native';
import { TaskContext } from '../contexts/TaskContext';
import { Colors } from '../styles/Colors';
import TaskCard from '../components/TaskCard';

export default function FutureTasksScreen() {
  const taskContext = useContext(TaskContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Planned Tasks</Text>
        <Text style={styles.subtitle}>Plan ahead for future days</Text>
      </View>

      {taskContext.state.loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : taskContext.state.futureTasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No future tasks planned</Text>
          <Text style={styles.emptySubtext}>
            Tasks you don't complete today can be carried forward or planned for future days
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.taskList} contentContainerStyle={styles.listContent}>
          {taskContext.state.futureTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={() => taskContext.deleteTask(task.id)}
            />
          ))}
        </ScrollView>
      )}
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
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  taskList: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
