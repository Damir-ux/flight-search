const fetchFlights = async () => {
  const response = await fetch('/flights.json');
  const data = await response.json();
  return data.result.flights;
};

export default fetchFlights;
