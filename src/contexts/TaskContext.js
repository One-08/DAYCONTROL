import React from 'react';

export const TaskContext = React.createContext({
  tasks: [],
  completedTasks: [],
  futureTasks: [],
  addTask: async (task) => {},
  updateTask: async (taskId, updates) => {},
  deleteTask: async (taskId) => {},
  completeTask: async (taskId) => {},
  loadTasks: async () => {},
  getTasksForDate: async (date) => {},
  carryForwardTasks: async () => {},
});
