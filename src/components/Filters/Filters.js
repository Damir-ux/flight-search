import React from 'react';
import './Filters.css';

const Filters = ({ filters, setFilters, flights }) => {
  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value,
    });
  };

  const stopsOptions = [...new Set(flights.map(flight => flight.flight.legs[0].segments.length - 1))];
  const airlineOptions = [...new Set(flights.map(flight => flight.flight.carrier.caption))];

  return (
    <div className="filters">
      <div className="filters__block">
        <h3 className="filters__title">Сортировать</h3>
        <label className="filters__label">
          <input
            type="radio"
            name="sort"
            value="asc"
            onChange={(e) => handleFilterChange('sort', e.target.value)}
          />
          по возрастанию цены
        </label>
        <label className="filters__label">
          <input
            type="radio"
            name="sort"
            value="desc"
            onChange={(e) => handleFilterChange('sort', e.target.value)}
          />
          по убыванию цены
        </label>
        <label className="filters__label">
          <input
            type="radio"
            name="sort"
            value="duration"
            onChange={(e) => handleFilterChange('sort', e.target.value)}
          />
          по времени в пути
        </label>
      </div>

      <div className="filters__block">
        <h3 className="filters__title">Фильтровать</h3>
        {stopsOptions.map(option => (
          <label key={option} className="filters__label">
            <input
              type="checkbox"
              className="filters__checkbox"
              checked={filters.stops.includes(option)}
              onChange={(e) =>
                handleFilterChange('stops', e.target.checked ? [...filters.stops, option] : filters.stops.filter(stop => stop !== option))
              }
            />
            {option} пересадок
          </label>
        ))}
      </div>

      <div className="filters__block">
        <h3 className="filters__title">Цена</h3>
        <label className="filters__label">
          От
          <input
            type="number"
            value={filters.priceMin}
            onChange={(e) => handleFilterChange('priceMin', e.target.value)}
            className="filters__input"
          />
        </label>
        <label className="filters__label">
          До
          <input
            type="number"
            value={filters.priceMax}
            onChange={(e) => handleFilterChange('priceMax', e.target.value)}
            className="filters__input"
          />
        </label>
      </div>

      <div className="filters__block">
        <h3 className="filters__title">Авиакомпании</h3>
        {airlineOptions.map(option => (
          <label key={option} className="filters__label">
            <input
              type="checkbox"
              className="filters__checkbox"
              checked={filters.airlines.includes(option)}
              onChange={(e) =>
                handleFilterChange('airlines', e.target.checked ? [...filters.airlines, option] : filters.airlines.filter(airline => airline !== option))
              }
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Filters;
