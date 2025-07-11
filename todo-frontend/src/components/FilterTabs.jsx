import React from 'react';

const FilterTabs = ({ filter, setFilter }) => {
  return (
    <div className="filter-tabs">
      {['all', 'completed', 'trashed'].map(f => (
        <button
          key={f}
          className={filter === f ? 'active' : ''}
          onClick={() => setFilter(f)}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
