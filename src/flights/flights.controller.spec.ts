import { Test, TestingModule } from '@nestjs/testing';
import { FlightsController } from './flights.controller';
import { FlightsService } from './flights.service';
import { FetchSource1Service, FetchSource2Service } from '../datasources';

describe('FlightsController', () => {
  let controller: FlightsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlightsController],
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

    controller = module.get<FlightsController>(FlightsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
