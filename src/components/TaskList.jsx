import React from 'react';
import TaskItem from './TaskItem.jsx';

const TaskList = ({ 
  tasks, 
  filter, 
  searchQuery, 
  selectedCategory, 
  selectedPriority, 
  onToggle, 
  onEdit, 
  onDelete 
}) => {
  const filteredTasks = tasks.filter(task => {
    // Filter by completion status
    let statusMatch = true;
    switch (filter) {
      case 'completed':
        statusMatch = task.completed;
        break;
      case 'pending':
        statusMatch = !task.completed;
        break;
      case 'overdue':
        statusMatch = !task.completed && task.dueDate && new Date(task.dueDate) < new Date();
        break;
      default:
        statusMatch = true;
    }

    // Filter by search query
    const searchMatch = !searchQuery || 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (task.tags && task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));

    // Filter by category
    const categoryMatch = selectedCategory === 'all' || task.category === selectedCategory;

    // Filter by priority
    const priorityMatch = selectedPriority === 'all' || task.priority === selectedPriority;

    return statusMatch && searchMatch && categoryMatch && priorityMatch;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    // Sort by completion status first
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    // Then by priority (high -> medium -> low)
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const aPriority = priorityOrder[a.priority] || 0;
    const bPriority = priorityOrder[b.priority] || 0;
    
    if (aPriority !== bPriority) {
      return bPriority - aPriority;
    }

    // Then by due date (closest first)
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (a.dueDate && !b.dueDate) return -1;
    if (!a.dueDate && b.dueDate) return 1;

    // Finally by creation date (newest first)
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  if (sortedTasks.length === 0) {
    const getEmptyStateMessage = () => {
      if (searchQuery) {
        return {
          icon: '🔍',
          title: 'No tasks found',
          message: `No tasks match your search for "${searchQuery}"`
        };
      }
      
      switch (filter) {
        case 'completed':
          return {
            icon: '✅',
            title: 'No completed tasks',
            message: 'No tasks have been completed yet.'
          };
        case 'pending':
          return {
            icon: '⭕',
            title: 'No pending tasks',
            message: 'All tasks are completed!'
          };
        case 'overdue':
          return {
            icon: '⚠️',
            title: 'No overdue tasks',
            message: 'Great! You\'re on top of your deadlines.'
          };
        default:
          return {
            icon: '📝',
            title: 'No tasks yet',
            message: 'Start by adding your first task!'
          };
      }
    };

    const emptyState = getEmptyStateMessage();

    return (
      <div className="empty-state">
        <div className="empty-icon">{emptyState.icon}</div>
        <h3>{emptyState.title}</h3>
        <p>{emptyState.message}</p>
        {searchQuery && (
          <button 
            onClick={() => window.location.reload()} 
            className="clear-filters-button"
          >
            Clear all filters
          </button>
        )}
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