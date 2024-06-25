import React from 'react';
import './FlightCard.css';

const FlightCard = ({ flight }) => {
  const getDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours} ч ${minutes} мин`;
  };

  const carrierCaption = flight.flight.carrier.caption || 'Неизвестная авиакомпания';

  return (
    <div className="flight-card">
      <div className="flight-card__header">
        <div className="flight-card__price">
          <span>{flight.flight.price.total.amount} {flight.flight.price.total.currency}</span>
          <span>Стоимость для одного взрослого пассажира</span>
        </div>
      </div>
      {flight.flight.legs.map((leg, index) => {
        const departureCity = leg.segments[0].departureCity || { caption: 'Неизвестный город' };
        const departureAirport = leg.segments[0].departureAirport || { caption: 'Неизвестный аэропорт', uid: 'N/A' };
        const arrivalCity = leg.segments[leg.segments.length - 1].arrivalCity || { caption: 'Неизвестный город' };
        const arrivalAirport = leg.segments[leg.segments.length - 1].arrivalAirport || { caption: 'Неизвестный аэропорт', uid: 'N/A' };
        const airlineCaption = leg.segments[0].airline.caption || 'Неизвестная авиакомпания';

        return (
          <div key={index} className="flight-card__segment">
            <div className="flight-card__route">
              <span>{departureCity.caption}, {departureAirport.caption} ({departureAirport.uid})</span>
              <span>→</span>
              <span>{arrivalCity.caption}, {arrivalAirport.caption} ({arrivalAirport.uid})</span>
            </div>
            <div className="flight-card__time">
              <span>{new Date(leg.segments[0].departureDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} {new Date(leg.segments[0].departureDate).toLocaleDateString()}</span>
              <span>{getDuration(leg.duration)}</span>
              <span>{new Date(leg.segments[leg.segments.length - 1].arrivalDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} {new Date(leg.segments[leg.segments.length - 1].arrivalDate).toLocaleDateString()}</span>
            </div>
            <div className="flight-card__details">
              <span>Рейс выполняет: {airlineCaption}</span>
              <span>{leg.segments.length - 1} пересадок</span>
            </div>
          </div>
        );
      })}
      <button className="flight-card__select-button">ВЫБРАТЬ</button>
    </div>
  );
};

export default FlightCard;
