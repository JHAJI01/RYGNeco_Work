import React from 'react';

const TaskFilter = ({ currentFilter, onFilterChange, counts }) => {
  const filters = [
    { key: 'all', label: 'All Tasks', count: counts.all, icon: '📝' },
    { key: 'pending', label: 'Pending', count: counts.pending, icon: '⭕' },
    { key: 'completed', label: 'Completed', count: counts.completed, icon: '✅' },
    { key: 'overdue', label: 'Overdue', count: counts.overdue, icon: '⚠️' }
  ];

  return (
    <div className="task-filters">
      {filters.map(({ key, label, count, icon }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`filter-button ${currentFilter === key ? 'active' : ''} ${key === 'overdue' && count > 0 ? 'urgent' : ''}`}
        >
          <span className="filter-icon">{icon}</span>
          <span className="filter-label">{label}</span>
          <span className="count">{count}</span>
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;