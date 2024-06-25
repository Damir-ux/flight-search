import React from 'react';
import './SortOptions.css';

const SortOptions = ({ sortOption, setSortOption }) => {
  return (
    <div className="sort-options">
      <label className="sort-options__label">
        <input
          type="radio"
          name="sort"
          value="asc"
          checked={sortOption === 'asc'}
          onChange={(e) => setSortOption(e.target.value)}
        />
        по возрастанию цены
      </label>
      <label className="sort-options__label">
        <input
          type="radio"
          name="sort"
          value="desc"
          checked={sortOption === 'desc'}
          onChange={(e) => setSortOption(e.target.value)}
        />
        по убыванию цены
      </label>
      <label className="sort-options__label">
        <input
          type="radio"
          name="sort"
          value="duration"
          checked={sortOption === 'duration'}
          onChange={(e) => setSortOption(e.target.value)}
        />
        по времени в пути
      </label>
    </div>
  );
};

export default SortOptions;
