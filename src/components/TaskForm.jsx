import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, onCancel, initialTask, isEditing = false }) => {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [priority, setPriority] = useState(initialTask?.priority || 'medium');
  const [category, setCategory] = useState(initialTask?.category || '');
  const [dueDate, setDueDate] = useState(
    initialTask?.dueDate ? new Date(initialTask.dueDate).toISOString().split('T')[0] : ''
  );
  const [tags, setTags] = useState(initialTask?.tags?.join(', ') || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description || '');
      setPriority(initialTask.priority || 'medium');
      setCategory(initialTask.category || '');
      setDueDate(
        initialTask.dueDate ? new Date(initialTask.dueDate).toISOString().split('T')[0] : ''
      );
      setTags(initialTask.tags?.join(', ') || '');
    }
  }, [initialTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim()) {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const taskData = {
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        category: category.trim() || undefined,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        tags: tags.trim() ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
        completed: initialTask?.completed || false
      };
      
      onSubmit(taskData);
      
      if (!isEditing) {
        setTitle('');
        setDescription('');
        setPriority('medium');
        setCategory('');
        setDueDate('');
        setTags('');
      }
      setIsSubmitting(false);
    }
  };

  const priorityOptions = [
    { value: 'low', label: 'Low Priority', color: '#10b981' },
    { value: 'medium', label: 'Medium Priority', color: '#f59e0b' },
    { value: 'high', label: 'High Priority', color: '#ef4444' }
  ];

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-row">
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
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            disabled={isSubmitting}
            className="priority-select"
          >
            {priorityOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., Work, Personal, Health"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            disabled={isSubmitting}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Enter task description"
          disabled={isSubmitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor="tags">Tags</label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Enter tags separated by commas (e.g., urgent, meeting, review)"
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

        {onCancel && (
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