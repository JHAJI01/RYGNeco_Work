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

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <div className="task-main">
          <div className="task-header">
            <button
              onClick={() => onToggle(task.id)}
              className={`toggle-button ${task.completed ? 'checked' : ''}`}
            >
              {task.completed && '✓'}
            </button>
            <h3 className="task-title">{task.title}</h3>
          </div>

          {task.description && (
            <p className="task-description">{task.description}</p>
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
        <div className="modal-overlay">
          <div className="confirm-modal">
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