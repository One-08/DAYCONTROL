import * as SQLite from 'expo-sqlite';
import { v4 as uuidv4 } from 'uuid';

let db = null;

export const initializeDatabase = async () => {
  try {
    db = await SQLite.openDatabaseAsync('daycontrol.db');

    // Create users table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        name TEXT,
        authProvider TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create tasks table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY,
        userId TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        dueDate DATE NOT NULL,
        completed BOOLEAN DEFAULT 0,
        priority INTEGER DEFAULT 0,
        isRecurring BOOLEAN DEFAULT 0,
        recurringDays TEXT,
        isCarriedOver BOOLEAN DEFAULT 0,
        completedAt TIMESTAMP,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    // Create completed_tasks table (for archive)
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS completed_tasks (
        id TEXT PRIMARY KEY,
        originalTaskId TEXT,
        userId TEXT NOT NULL,
        title TEXT NOT NULL,
        completedDate DATE,
        completedAt TIMESTAMP,
        FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    console.log('Database initialized successfully');
    return db;
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export const getDatabase = () => db;

// User operations
export const saveUser = async (user) => {
  if (!db) return null;
  try {
    const userId = uuidv4();
    await db.runAsync(
      `INSERT OR REPLACE INTO users (id, email, name, authProvider) 
       VALUES (?, ?, ?, ?)`,
      [userId, user.email, user.name, user.provider]
    );
    return userId;
  } catch (error) {
    console.error('Error saving user:', error);
  }
};

export const getUserByEmail = async (email) => {
  if (!db) return null;
  try {
    const result = await db.getFirstAsync(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return result;
  } catch (error) {
    console.error('Error getting user:', error);
  }
};

// Task operations
export const addTask = async (userId, task) => {
  if (!db) return null;
  try {
    const taskId = uuidv4();
    await db.runAsync(
      `INSERT INTO tasks 
       (id, userId, title, description, dueDate, priority, isRecurring, recurringDays)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        taskId,
        userId,
        task.title,
        task.description || '',
        task.dueDate,
        task.priority || 0,
        task.isRecurring ? 1 : 0,
        task.recurringDays ? JSON.stringify(task.recurringDays) : null,
      ]
    );
    return taskId;
  } catch (error) {
    console.error('Error adding task:', error);
  }
};

export const getTasksForDate = async (userId, date) => {
  if (!db) return [];
  try {
    const result = await db.getAllAsync(
      `SELECT * FROM tasks 
       WHERE userId = ? AND dueDate = ? AND completed = 0
       ORDER BY priority DESC, createdAt ASC`,
      [userId, date]
    );
    return result || [];
  } catch (error) {
    console.error('Error getting tasks:', error);
    return [];
  }
};

export const completeTask = async (taskId) => {
  if (!db) return false;
  try {
    const now = new Date().toISOString();
    await db.runAsync(
      `UPDATE tasks SET completed = 1, completedAt = ? WHERE id = ?`,
      [now, taskId]
    );
    return true;
  } catch (error) {
    console.error('Error completing task:', error);
    return false;
  }
};

export const updateTask = async (taskId, updates) => {
  if (!db) return false;
  try {
    const now = new Date().toISOString();
    const updateFields = Object.keys(updates)
      .map((key) => `${key} = ?`)
      .join(', ');
    const values = [...Object.values(updates), now, taskId];

    await db.runAsync(
      `UPDATE tasks SET ${updateFields}, updatedAt = ? WHERE id = ?`,
      values
    );
    return true;
  } catch (error) {
    console.error('Error updating task:', error);
    return false;
  }
};

export const deleteTask = async (taskId) => {
  if (!db) return false;
  try {
    await db.runAsync('DELETE FROM tasks WHERE id = ?', [taskId]);
    return true;
  } catch (error) {
    console.error('Error deleting task:', error);
    return false;
  }
};

export const getCompletedTasksForDate = async (userId, date) => {
  if (!db) return [];
  try {
    const result = await db.getAllAsync(
      `SELECT * FROM tasks 
       WHERE userId = ? AND dueDate = ? AND completed = 1
       ORDER BY completedAt DESC`,
      [userId, date]
    );
    return result || [];
  } catch (error) {
    console.error('Error getting completed tasks:', error);
    return [];
  }
};

export const getIncompleteTasks = async (userId) => {
  if (!db) return [];
  try {
    const result = await db.getAllAsync(
      `SELECT * FROM tasks 
       WHERE userId = ? AND completed = 0 AND dueDate < date('now')
       ORDER BY dueDate ASC, priority DESC`,
      [userId]
    );
    return result || [];
  } catch (error) {
    console.error('Error getting incomplete tasks:', error);
    return [];
  }
};

export const carryForwardIncompleteTasks = async (userId, fromDate, toDate) => {
  if (!db) return false;
  try {
    const incompleteTasks = await db.getAllAsync(
      `SELECT * FROM tasks 
       WHERE userId = ? AND dueDate = ? AND completed = 0`,
      [userId, fromDate]
    );

    for (const task of incompleteTasks) {
      const newTaskId = uuidv4();
      await db.runAsync(
        `INSERT INTO tasks 
         (id, userId, title, description, dueDate, priority, isRecurring, recurringDays, isCarriedOver)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)`,
        [
          newTaskId,
          userId,
          task.title,
          task.description,
          toDate,
          task.priority,
          task.isRecurring,
          task.recurringDays,
        ]
      );
    }
    return true;
  } catch (error) {
    console.error('Error carrying forward tasks:', error);
    return false;
  }
};
