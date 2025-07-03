import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, onCancel, initialTask, isEditing = false }) => {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description || '');
    }
  }, [initialTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim()) {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      onSubmit({
        title: title.trim(),
        description: description.trim() || undefined,
        completed: initialTask?.completed || false
      });
      
      if (!isEditing) {
        setTitle('');
        setDescription('');
      }
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="title">Task Title *</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description (optional)</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Enter task description"
          disabled={isSubmitting}
        />
      </div>

      <div className="form-actions">
        <button
          type="submit"
          disabled={!title.trim() || isSubmitting}
          className="submit-button"
        >
          {isSubmitting ? (
            <div className="button-spinner"></div>
          ) : (
            <>
              <span>{isEditing ? '✏️' : '➕'}</span>
              <span>{isEditing ? 'Update Task' : 'Add Task'}</span>
            </>
          )}
        </button>

        {isEditing && onCancel && (
          <button type="button" onClick={onCancel} className="cancel-button">
            <span>✕</span>
            <span>Cancel</span>
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;