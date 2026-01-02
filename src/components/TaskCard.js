import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../styles/Colors';

const getPriorityColor = (priority) => {
  switch (priority) {
    case 0:
      return '#4CAF50';
    case 1:
      return '#FF9800';
    case 2:
      return '#FF5252';
    default:
      return Colors.border;
  }
};

const getPriorityLabel = (priority) => {
  switch (priority) {
    case 0:
      return 'Low';
    case 1:
      return 'Medium';
    case 2:
      return 'High';
    default:
      return 'Normal';
  }
};

export default function TaskCard({
  task,
  isCompleted = false,
  onComplete,
  onDelete,
}) {
  return (
    <View
      style={[
        styles.card,
        isCompleted && styles.completedCard,
      ]}
    >
      <View style={styles.content}>
        <View style={styles.leftSection}>
          {!isCompleted ? (
            <TouchableOpacity
              style={styles.checkbox}
              onPress={onComplete}
            >
              <View />
            </TouchableOpacity>
          ) : (
            <View style={[styles.checkbox, styles.checkedBox]}>
              <Text style={styles.checkmark}>✓</Text>
            </View>
          )}
        </View>

        <View style={styles.middleSection}>
          <Text
            style={[
              styles.title,
              isCompleted && styles.completedTitle,
            ]}
            numberOfLines={2}
          >
            {task.title}
          </Text>
          {task.description ? (
            <Text
              style={[
                styles.description,
                isCompleted && styles.completedDescription,
              ]}
              numberOfLines={1}
            >
              {task.description}
            </Text>
          ) : null}
          {!isCompleted && (
            <View style={styles.priorityBadge}>
              <View
                style={[
                  styles.priorityDot,
                  { backgroundColor: getPriorityColor(task.priority) },
                ]}
              />
              <Text style={styles.priorityText}>
                {getPriorityLabel(task.priority)}
              </Text>
            </View>
          )}
        </View>

        {onDelete && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={onDelete}
          >
            <Text style={styles.deleteIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {task.isCarriedOver ? (
        <View style={styles.carriedOverBadge}>
          <Text style={styles.carriedOverText}>↻ Carried Over</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 10,
    marginBottom: 10,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  completedCard: {
    borderLeftColor: '#4CAF50',
    opacity: 0.7,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  leftSection: {
    marginRight: 12,
    marginTop: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkmark: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  middleSection: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: Colors.textSecondary,
  },
  description: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  completedDescription: {
    textDecorationLine: 'line-through',
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
  },
  priorityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  priorityText: {
    fontSize: 12,
    color: Colors.text,
    fontWeight: '500',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  deleteIcon: {
    fontSize: 18,
    color: '#FF5252',
    fontWeight: 'bold',
  },
  carriedOverBadge: {
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#FFF3E0',
    borderRadius: 4,
  },
  carriedOverText: {
    fontSize: 11,
    color: '#FF9800',
    fontWeight: '600',
  },
});
