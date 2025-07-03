const TASKS_KEY = 'tasks';
const USER_KEY = 'user';
const THEME_KEY = 'theme';

export const getTasks = () => {
  try {
    const tasks = localStorage.getItem(TASKS_KEY);
    if (!tasks) return [];
    
    const parsedTasks = JSON.parse(tasks);
    return parsedTasks.map((task) => ({
      ...task,
      createdAt: new Date(task.createdAt),
      updatedAt: new Date(task.updatedAt),
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined
    }));
  } catch (error) {
    console.error('Error loading tasks:', error);
    return [];
  }
};

export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks:', error);
  }
};

export const getUser = () => {
  try {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error loading user:', error);
    return null;
  }
};

export const saveUser = (user) => {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user:', error);
  }
};

export const clearUser = () => {
  try {
    localStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error('Error clearing user:', error);
  }
};

export const getTheme = () => {
  try {
    return localStorage.getItem(THEME_KEY) || 'light';
  } catch (error) {
    console.error('Error loading theme:', error);
    return 'light';
  }
};

export const saveTheme = (theme) => {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.error('Error saving theme:', error);
  }
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};