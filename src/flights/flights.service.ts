import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Flight } from '../types';
// Import the fetch functions from the datasources
import { FetchSource1Service, FetchSource2Service } from '../datasources';

@Injectable()
export class FlightsService {
  constructor(
    private readonly fetchSource1Service: FetchSource1Service,
    private readonly fetchSource2Service: FetchSource2Service,
  ) {}

  async findAll(): Promise<any> {
    // Here we list the sources we want to fetch data from
    const promises = [
      this.fetchSource1Service.fetch,
      this.fetchSource2Service.fetch,
    ];

    try {
      // Promise.all waits for all promises to resolve
      // each promise in the array is a request to a different source
      // requests are made in parallel
      // and will be discarded if they take longer than 1 second
      // as to not block the response and ensure a timely response
      const responses = await Promise.all(
        promises.map((promise) =>
          Promise.race([
            promise(),
            new Promise<AxiosResponse>((_, reject) =>
              setTimeout(
                () => reject(new Error(`Request timeout for ${promise}`)),
                750,
              ),
            ),
          ]).catch((_) => {
            return {
              flights: [],
            };
          }),
        ),
      );

      const mergedFlights: Flight[] = [];

      responses.forEach((response) => {
        mergedFlights.push(response);
      });

      const uniqueFlights = this.mergeFlights(mergedFlights);

      return { flights: uniqueFlights };
    } catch (_) {
      throw new Error('Failed to fetch flights');
    }
  }

  mergeFlights(sources: any[]): Flight[] {
    const flightsMap: Map<string, Flight> = new Map();

    function addOrUpdateFlight(flight: Flight) {
      const identifier = flight.slices
        .map((slice) => slice.flight_number + slice.departure_date_time_utc)
        .join('');

      const existingFlight = flightsMap.get(identifier);
      // if flight does not exist or if the new flight is cheaper
      // add or update the flight in the map
      if (!existingFlight || flight.price < existingFlight.price) {
        flightsMap.set(identifier, flight);
      }
    }

    // Process flights from all sources
    sources.forEach((source) => {
      source.flights.forEach((flight: Flight) => {
        addOrUpdateFlight(flight);
      });
    });

    // Convert map values to array and return
    return Array.from(flightsMap.values());
  }
}
