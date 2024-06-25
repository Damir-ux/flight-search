import React, { useState, useEffect } from 'react';
import Filters from '../Filters/Filters';
import FlightList from '../FlightList/FlightList';
import SortOptions from '../SortOptions/SortOptions';
import fetchFlights from '../../services/flightService';
import './App.css';

const App = () => {
  const [flights, setFlights] = useState([]);
  const [filters, setFilters] = useState({
    stops: [],
    priceMin: 0,
    priceMax: 1000000,
    airlines: [],
    sort: 'asc',
  });
  const [sortOption, setSortOption] = useState('asc');

  useEffect(() => {
    const loadFlights = async () => {
      const flightsData = await fetchFlights();
      setFlights(flightsData);
    };

    loadFlights();
  }, []);

  const applyFilters = (flights, filters) => {
    return flights
      .filter(flight => 
        (filters.stops.length === 0 || filters.stops.includes(flight.flight.legs[0].segments.length - 1)) &&
        (filters.airlines.length === 0 || filters.airlines.includes(flight.flight.carrier.caption)) &&
        flight.flight.price.total.amount >= filters.priceMin &&
        flight.flight.price.total.amount <= filters.priceMax
      )
      .sort((a, b) => {
        if (filters.sort === 'asc') {
          return a.flight.price.total.amount - b.flight.price.total.amount;
        } else if (filters.sort === 'desc') {
          return b.flight.price.total.amount - a.flight.price.total.amount;
        } else if (filters.sort === 'duration') {
          return a.flight.legs[0].duration - b.flight.legs[0].duration;
        }
        return 0;
      });
  };

  const filteredFlights = applyFilters(flights, filters);

  return (
    <div className="app">
      <div className="app__sidebar">
        <Filters filters={filters} setFilters={setFilters} flights={flights} />
      </div>
      <div className="app__main">
        <SortOptions sortOption={sortOption} setSortOption={setSortOption} />
        <FlightList flights={filteredFlights} />
      </div>
    </div>
  );
};

export default App;
