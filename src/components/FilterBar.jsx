import React from 'react';

const FilterBar = ({ filter, setFilter, sortBy, setSortBy, searchQuery, setSearchQuery }) => {
  return (
    <div className="filter-container glass-morphism">
      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input 
          type="text" 
          placeholder="Scan database for tasks or tags..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="filter-controls">
        <div className="chip-group">
          {['all', 'pending', 'completed', 'high'].map(f => (
            <button 
              key={f}
              className={`filter-chip ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="sort-selector">
          <label className="input-label" style={{ marginBottom: '4px' }}>Sort Protocol</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: '8px 16px', borderRadius: '10px' }}
          >
            <option value="recent">Recent Entry</option>
            <option value="dueDate">Timeline</option>
            <option value="priority">Priority Rank</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
