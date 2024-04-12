import { Test, TestingModule } from '@nestjs/testing';
import { FlightsService } from './flights.service';
import { FetchSource1Service, FetchSource2Service } from '../datasources';

describe('FlightsService', () => {
  let service: FlightsService;
  let fetchSource1: FetchSource1Service;
  let fetchSource2: FetchSource2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FlightsService,
        {
          provide: FetchSource1Service,
          useValue: {
            fetch: jest.fn(),
          },
        }, // Mock FetchSource1Service
        {
          provide: FetchSource2Service,
          useValue: {
            fetch: jest.fn(),
          },
        }, // Mock FetchSource1Service
      ],
    }).compile();

    service = module.get<FlightsService>(FlightsService);
    fetchSource1 = module.get<FetchSource1Service>(FetchSource1Service);
    fetchSource2 = module.get<FetchSource2Service>(FetchSource2Service);
  });

  describe('findAll', () => {
    it('should return all flights if there are not duplicates', async () => {
      const fetchSource1Response = {
        flights: [
          {
            slices: [
              {
                flight_number: '1',
                departure_date_time_utc: '2022-01-01T10:00:00Z',
              },
              {
                flight_number: '2',
                departure_date_time_utc: '2022-01-02T12:00:00Z',
              },
            ],
            price: 100,
          },
          {
            slices: [
              {
                flight_number: '3',
                departure_date_time_utc: '2022-01-01T10:00:00Z',
              },
              {
                flight_number: '4',
                departure_date_time_utc: '2022-01-02T12:00:00Z',
              },
            ],
            price: 100,
          },
        ],
      };
      const fetchSource2Response = {
        flights: [
          {
            slices: [
              {
                flight_number: '5',
                departure_date_time_utc: '2022-01-01T10:00:00Z',
              },
              {
                flight_number: '6',
                departure_date_time_utc: '2022-01-02T12:00:00Z',
              },
            ],
            price: 100,
          },
          {
            slices: [
              {
                flight_number: '7',
                departure_date_time_utc: '2022-01-01T10:00:00Z',
              },
              {
                flight_number: '8',
                departure_date_time_utc: '2022-01-02T12:00:00Z',
              },
            ],
            price: 100,
          },
        ],
      };

      jest.spyOn(fetchSource1, 'fetch').mockResolvedValue(fetchSource1Response);
      jest.spyOn(fetchSource2, 'fetch').mockResolvedValue(fetchSource2Response);

      const result = await service.findAll();

      expect(result).toEqual({
        flights: [
          {
            slices: [
              {
                flight_number: '1',
                departure_date_time_utc: '2022-01-01T10:00:00Z',
              },
              {
                flight_number: '2',
                departure_date_time_utc: '2022-01-02T12:00:00Z',
              },
            ],
            price: 100,
          },
          {
            slices: [
              {
                flight_number: '3',
                departure_date_time_utc: '2022-01-01T10:00:00Z',
              },
              {
                flight_number: '4',
                departure_date_time_utc: '2022-01-02T12:00:00Z',
              },
            ],
            price: 100,
          },
          {
            slices: [
              {
                flight_number: '5',
                departure_date_time_utc: '2022-01-01T10:00:00Z',
              },
              {
                flight_number: '6',
                departure_date_time_utc: '2022-01-02T12:00:00Z',
              },
            ],
            price: 100,
          },
          {
            slices: [
              {
                flight_number: '7',
                departure_date_time_utc: '2022-01-01T10:00:00Z',
              },
              {
                flight_number: '8',
                departure_date_time_utc: '2022-01-02T12:00:00Z',
              },
            ],
            price: 100,
          },
        ],
      });
    });

    it('should remove duplicate flights', async () => {
      const fetchSource1Response = {
        flights: [
          {
            slices: [
              {
                flight_number: '1',
                departure_date_time_utc: '2022-01-01T10:00:00Z',
              },
              {
                flight_number: '2',
                departure_date_time_utc: '2022-01-02T12:00:00Z',
              },
            ],
            price: 100,
          },
          {
            slices: [
              {
                flight_number: '3',
                departure_date_time_utc: '2022-01-01T10:00:00Z',
              },
              {
                flight_number: '4',
                departure_date_time_utc: '2022-01-02T12:00:00Z',
              },
            ],
            price: 100,
          },
        ],
      };

      const fetchSource2Response = {
        flights: [
          {
            slices: [
              {
                flight_number: '3',
                departure_date_time_utc: '2022-01-01T10:00:00Z',
              },
              {
                flight_number: '4',
                departure_date_time_utc: '2022-01-02T12:00:00Z',
              },
            ],
            price: 100,
          },
          {
            slices: [
              {
                flight_number: '5',
                departure_date_time_utc: '2022-01-01T10:00:00Z',
              },
              {
                flight_number: '6',
                departure_date_time_utc: '2022-01-02T12:00:00Z',
              },
            ],
            price: 100,
          },
        ],
      };

      jest.spyOn(fetchSource1, 'fetch').mockResolvedValue(fetchSource1Response);
      jest.spyOn(fetchSource2, 'fetch').mockResolvedValue(fetchSource2Response);

      const result = await service.findAll();

      expect(result).toEqual({
        flights: [
          {
            slices: [
              {
                flight_number: '1',
                departure_date_time_utc: '2022-01-01T10:00:00Z',
              },
              {
                flight_number: '2',
                departure_date_time_utc: '2022-01-02T12:00:00Z',
              },
            ],
            price: 100,
          },
          {
            slices: [
              {
                flight_number: '3',
                departure_date_time_utc: '2022-01-01T10:00:00Z',
              },
              {
                flight_number: '4',
                departure_date_time_utc: '2022-01-02T12:00:00Z',
              },
            ],
            price: 100,
          },
          {
            slices: [
              {
                flight_number: '5',
                departure_date_time_utc: '2022-01-01T10:00:00Z',
              },
              {
                flight_number: '6',
                departure_date_time_utc: '2022-01-02T12:00:00Z',
              },
            ],
            price: 100,
          },
        ],
      });
    });

    it('should return available results if one request succeeds and one request fails', async () => {
      const fetchSource2Response = {
        flights: [
          {
            slices: [
              {
                flight_number: '3',
                departure_date_time_utc: '2022-01-01T10:00:00Z',
              },
              {
                flight_number: '4',
                departure_date_time_utc: '2022-01-02T12:00:00Z',
              },
            ],
            price: 100,
          },
          {
            slices: [
              {
                flight_number: '5',
                departure_date_time_utc: '2022-01-01T10:00:00Z',
              },
              {
                flight_number: '6',
                departure_date_time_utc: '2022-01-02T12:00:00Z',
              },
            ],
            price: 100,
          },
        ],
      };

      jest
        .spyOn(fetchSource1, 'fetch')
        .mockRejectedValue(new Error('Failed to fetch data'));
      jest.spyOn(fetchSource2, 'fetch').mockResolvedValue(fetchSource2Response);

      const result = await service.findAll();

      expect(result).toEqual(fetchSource2Response);
    });

    it('should return available results after 750 milliseconds to ensure sub second response', async () => {
      const fetchSource1Response = {
        flights: [
          {
            slices: [
              {
                flight_number: '1',
                departure_date_time_utc: '2022-01-01T10:00:00Z',
              },
              {
                flight_number: '2',
                departure_date_time_utc: '2022-01-02T12:00:00Z',
              },
            ],
            price: 100,
          },
        ],
      };

      const fetchSource2Response = {
        flights: [
          {
            slices: [
              {
                flight_number: '3',
                departure_date_time_utc: '2022-01-01T10:00:00Z',
              },
              {
                flight_number: '4',
                departure_date_time_utc: '2022-01-02T12:00:00Z',
              },
            ],
            price: 100,
          },
        ],
      };

      jest.spyOn(fetchSource1, 'fetch').mockImplementation(
        () =>
          new Promise((resolve) => {
            setTimeout(() => resolve(fetchSource1Response), 5000);
          }),
      );

      jest.spyOn(fetchSource2, 'fetch').mockResolvedValue(fetchSource2Response);

      const result = await service.findAll();

      expect(result).toEqual(fetchSource2Response);
    });
  });
});
