import React from 'react';
import FlightCard from '../FlightCard/FlightCard';
import './FlightList.css';

const FlightList = ({ flights }) => {
  return (
    <div className="flight-list">
      {flights.map((flight, index) => (
        <FlightCard key={index} flight={flight} />
      ))}
      <button className="flight-list__load-more">Показать еще</button>
    </div>
  );
};

export default FlightList;
