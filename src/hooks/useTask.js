import { useReducer, useCallback, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import {
  addTask,
  getTasksForDate,
  completeTask,
  updateTask,
  deleteTask,
  getCompletedTasksForDate,
  getIncompleteTasks,
  carryForwardIncompleteTasks,
} from '../database/db';
import { sendTaskNotification, scheduleTaskReminder } from '../services/NotificationService';

const initialState = {
  tasks: [],
  completedTasks: [],
  futureTasks: [],
  loading: false,
  error: null,
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.payload,
        loading: false,
      };
    case 'SET_COMPLETED_TASKS':
      return {
        ...state,
        completedTasks: action.payload,
      };
    case 'SET_FUTURE_TASKS':
      return {
        ...state,
        futureTasks: action.payload,
      };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const useTask = () => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const { state: authState } = useContext(AuthContext);

  const addNewTask = useCallback(
    async (taskData) => {
      if (!authState.user) return;
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const taskId = await addTask(authState.user.id, taskData);
        const newTask = { ...taskData, id: taskId };
        dispatch({ type: 'ADD_TASK', payload: newTask });

        // Schedule notification for the task
        await scheduleTaskReminder(taskId, taskData.dueDate, taskData.title);

        dispatch({ type: 'SET_LOADING', payload: false });
        return taskId;
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },
    [authState.user]
  );

  const loadTasksForDate = useCallback(
    async (date) => {
      if (!authState.user) return;
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const tasks = await getTasksForDate(authState.user.id, date);
        dispatch({ type: 'SET_TASKS', payload: tasks });

        const completed = await getCompletedTasksForDate(authState.user.id, date);
        dispatch({ type: 'SET_COMPLETED_TASKS', payload: completed });

        dispatch({ type: 'SET_LOADING', payload: false });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },
    [authState.user]
  );

  const completeTaskHandler = useCallback(async (taskId) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await completeTask(taskId);
      const task = state.tasks.find((t) => t.id === taskId);
      if (task) {
        dispatch({ type: 'UPDATE_TASK', payload: { ...task, completed: 1 } });

        const incompleteCount = state.tasks.filter(
          (t) => !t.completed && t.id !== taskId
        ).length;

        if (incompleteCount === 0) {
          await sendTaskNotification('Great!', 'All tasks for today completed!');
        } else {
          await sendTaskNotification(
            'Keep Going!',
            `${incompleteCount} tasks remaining`
          );
        }
      }
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.tasks]);

  const updateTaskHandler = useCallback(async (taskId, updates) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await updateTask(taskId, updates);
      const task = state.tasks.find((t) => t.id === taskId);
      if (task) {
        dispatch({ type: 'UPDATE_TASK', payload: { ...task, ...updates } });
      }
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.tasks]);

  const deleteTaskHandler = useCallback(async (taskId) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await deleteTask(taskId);
      dispatch({ type: 'DELETE_TASK', payload: taskId });
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const carryForwardTasks = useCallback(async () => {
    if (!authState.user) return;
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000)
        .toISOString()
        .split('T')[0];
      await carryForwardIncompleteTasks(authState.user.id, yesterday, today);
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [authState.user]);

  return {
    state,
    addTask: addNewTask,
    loadTasks: loadTasksForDate,
    completeTask: completeTaskHandler,
    updateTask: updateTaskHandler,
    deleteTask: deleteTaskHandler,
    carryForwardTasks,
  };
};
