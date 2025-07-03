import React from 'react';
import TaskItem from './TaskItem.js';

const TaskList = ({ tasks, filter, onToggle, onEdit, onDelete }) => {
  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'completed':
        return task.completed;
      case 'pending':
        return !task.completed;
      default:
        return true;
    }
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    // Sort by completion status, then by creation date (newest first)
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  if (sortedTasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          {filter === 'completed' ? '✅' : 
           filter === 'pending' ? '⭕' : 
           '📝'}
        </div>
        <h3>
          {filter === 'completed' ? 'No completed tasks' : 
           filter === 'pending' ? 'No pending tasks' : 
           'No tasks yet'}
        </h3>
        <p>
          {filter === 'all' ? 'Start by adding your first task!' : 
           filter === 'pending' ? 'All tasks are completed!' : 
           'No tasks have been completed yet.'}
        </p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {sortedTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;