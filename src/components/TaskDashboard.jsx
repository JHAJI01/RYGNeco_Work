import React, { useState, useEffect } from 'react';
import { getTasks, saveTasks, generateId, getTheme, saveTheme } from '../utils/localStorage.js';
import TaskForm from './TaskForm.jsx';
import TaskList from './TaskList.jsx';
import TaskFilter from './TaskFilter.jsx';
import SearchBar from './SearchBar.jsx';

const TaskDashboard = ({ username, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const loadedTasks = getTasks();
    setTasks(loadedTasks);
    
    const savedTheme = getTheme();
    setDarkMode(savedTheme === 'dark');
    document.documentElement.setAttribute('data-theme', savedTheme || 'light');
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const toggleDarkMode = () => {
    const newTheme = darkMode ? 'light' : 'dark';
    setDarkMode(!darkMode);
    saveTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleAddTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setTasks(prev => [newTask, ...prev]);
    setShowForm(false);
  };

  const handleEditTask = (taskData) => {
    if (editingTask) {
      setTasks(prev => prev.map(task => 
        task.id === editingTask.id
          ? { ...task, ...taskData, updatedAt: new Date() }
          : task
      ));
      setEditingTask(null);
    }
  };

  const handleToggleTask = (id) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, completed: !task.completed, updatedAt: new Date() }
        : task
    ));
  };

  const handleDeleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const getCounts = () => {
    const completed = tasks.filter(task => task.completed).length;
    const pending = tasks.filter(task => !task.completed).length;
    const overdue = tasks.filter(task => 
      !task.completed && task.dueDate && new Date(task.dueDate) < new Date()
    ).length;
    
    return {
      all: tasks.length,
      completed,
      pending,
      overdue
    };
  };

  const getCategories = () => {
    const categories = new Set();
    tasks.forEach(task => {
      if (task.category) {
        categories.add(task.category);
      }
    });
    return Array.from(categories);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-info">
            <h1>Task Manager</h1>
            <p>Welcome back, {username}!</p>
          </div>
          <div className="header-actions">
            <button onClick={toggleDarkMode} className="theme-toggle" title="Toggle dark mode">
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button onClick={onLogout} className="logout-button">
              <span>🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="tasks-section">
          <div className="tasks-header">
            <h2>Your Tasks</h2>
            <button onClick={() => setShowForm(true)} className="add-task-button">
              <span>➕</span>
              <span>Add Task</span>
            </button>
          </div>

          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedPriority={selectedPriority}
            onPriorityChange={setSelectedPriority}
            categories={getCategories()}
          />

          <TaskFilter
            currentFilter={filter}
            onFilterChange={setFilter}
            counts={getCounts()}
          />
        </div>

        <TaskList
          tasks={tasks}
          filter={filter}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          selectedPriority={selectedPriority}
          onToggle={handleToggleTask}
          onEdit={setEditingTask}
          onDelete={handleDeleteTask}
        />
      </div>

      {/* Add Task Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Task</h3>
              <button onClick={() => setShowForm(false)} className="close-button">
                ✕
              </button>
            </div>
            <TaskForm onSubmit={handleAddTask} onCancel={() => setShowForm(false)} />
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {editingTask && (
        <div className="modal-overlay" onClick={() => setEditingTask(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Task</h3>
              <button onClick={() => setEditingTask(null)} className="close-button">
                ✕
              </button>
            </div>
            <TaskForm
              onSubmit={handleEditTask}
              onCancel={() => setEditingTask(null)}
              initialTask={editingTask}
              isEditing={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDashboard;