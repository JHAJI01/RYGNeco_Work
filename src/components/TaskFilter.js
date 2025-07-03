import React from 'react';

const TaskFilter = ({ currentFilter, onFilterChange, counts }) => {
  const filters = [
    { key: 'all', label: 'All Tasks', count: counts.all },
    { key: 'pending', label: 'Pending', count: counts.pending },
    { key: 'completed', label: 'Completed', count: counts.completed }
  ];

  return (
    <div className="task-filters">
      {filters.map(({ key, label, count }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`filter-button ${currentFilter === key ? 'active' : ''}`}
        >
          <span>{label}</span>
          <span className="count">{count}</span>
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;