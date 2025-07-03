import React, { useState } from 'react';

const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    onDelete(task.id);
    setShowDeleteConfirm(false);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatDueDate = (date) => {
    const now = new Date();
    const due = new Date(date);
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { text: `Overdue by ${Math.abs(diffDays)} day(s)`, className: 'overdue' };
    } else if (diffDays === 0) {
      return { text: 'Due today', className: 'due-today' };
    } else if (diffDays === 1) {
      return { text: 'Due tomorrow', className: 'due-soon' };
    } else if (diffDays <= 7) {
      return { text: `Due in ${diffDays} days`, className: 'due-soon' };
    } else {
      return { text: `Due ${formatDate(due)}`, className: 'due-later' };
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const getPriorityClass = (priority) => {
    return `priority-${priority}`;
  };

  const dueDateInfo = task.dueDate ? formatDueDate(task.dueDate) : null;

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${getPriorityClass(task.priority)} ${dueDateInfo?.className || ''}`}>
      <div className="task-content">
        <div className="task-main">
          <div className="task-header">
            <button
              onClick={() => onToggle(task.id)}
              className={`toggle-button ${task.completed ? 'checked' : ''}`}
            >
              {task.completed && '✓'}
            </button>
            <div className="task-title-section">
              <h3 className="task-title">{task.title}</h3>
              <div className="task-badges">
                <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
                  {getPriorityIcon(task.priority)} {task.priority}
                </span>
                {task.category && (
                  <span className="category-badge">
                    📁 {task.category}
                  </span>
                )}
              </div>
            </div>
          </div>

          {task.description && (
            <p className="task-description">{task.description}</p>
          )}

          {task.tags && task.tags.length > 0 && (
            <div className="task-tags">
              {task.tags.map((tag, index) => (
                <span key={index} className="tag">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="task-meta">
            <div className="meta-item">
              <span>📅</span>
              <span>Created: {formatDate(task.createdAt)}</span>
            </div>
            {task.updatedAt && task.updatedAt.getTime() !== task.createdAt.getTime() && (
              <div className="meta-item">
                <span>🕒</span>
                <span>Updated: {formatDate(task.updatedAt)}</span>
              </div>
            )}
            {dueDateInfo && (
              <div className={`meta-item due-date ${dueDateInfo.className}`}>
                <span>⏰</span>
                <span>{dueDateInfo.text}</span>
              </div>
            )}
          </div>
        </div>

        <div className="task-actions">
          <button
            onClick={() => onEdit(task)}
            className="action-button edit-button"
            title="Edit task"
          >
            ✏️
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="action-button delete-button"
            title="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Task</h3>
            <p>Are you sure you want to delete this task? This action cannot be undone.</p>
            <div className="confirm-actions">
              <button onClick={handleDelete} className="confirm-delete">
                Delete
              </button>
              <button onClick={() => setShowDeleteConfirm(false)} className="confirm-cancel">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;