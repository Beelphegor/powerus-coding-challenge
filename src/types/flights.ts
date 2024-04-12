interface Slice {
  origin_name: string;
  destination_name: string;
  departure_date_time_utc: string;
  arrival_date_time_utc: string;
  flight_number: string;
  duration: number;
  price: number;
}

interface Flight {
  slices: Slice[];
  price: number;
}

export { Flight, Slice };
