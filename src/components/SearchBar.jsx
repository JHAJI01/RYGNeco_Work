import React from 'react';

const SearchBar = ({ 
  searchQuery, 
  onSearchChange, 
  selectedCategory, 
  onCategoryChange, 
  selectedPriority, 
  onPriorityChange, 
  categories 
}) => {
  const priorities = [
    { value: 'all', label: 'All Priorities' },
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' }
  ];

  return (
    <div className="search-section">
      <div className="search-bar">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button 
              onClick={() => onSearchChange('')}
              className="clear-search"
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="filter-dropdowns">
        <div className="dropdown-group">
          <label>Category:</label>
          <select 
            value={selectedCategory} 
            onChange={(e) => onCategoryChange(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="dropdown-group">
          <label>Priority:</label>
          <select 
            value={selectedPriority} 
            onChange={(e) => onPriorityChange(e.target.value)}
            className="filter-select"
          >
            {priorities.map(priority => (
              <option key={priority.value} value={priority.value}>
                {priority.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;