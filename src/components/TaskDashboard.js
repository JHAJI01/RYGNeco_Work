import React, { useState, useEffect } from 'react';
import { getTasks, saveTasks, generateId } from '../utils/localStorage.js';
import TaskForm from './TaskForm.js';
import TaskList from './TaskList.js';
import TaskFilter from './TaskFilter.js';

const TaskDashboard = ({ username, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const loadedTasks = getTasks();
    setTasks(loadedTasks);
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

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
    return {
      all: tasks.length,
      completed,
      pending
    };
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-info">
            <h1>Task Manager</h1>
            <p>Welcome back, {username}!</p>
          </div>
          <button onClick={onLogout} className="logout-button">
            <span>🚪</span>
            <span>Logout</span>
          </button>
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

          <TaskFilter
            currentFilter={filter}
            onFilterChange={setFilter}
            counts={getCounts()}
          />
        </div>

        <TaskList
          tasks={tasks}
          filter={filter}
          onToggle={handleToggleTask}
          onEdit={setEditingTask}
          onDelete={handleDeleteTask}
        />
      </div>

      {/* Add Task Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
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
        <div className="modal-overlay">
          <div className="modal">
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