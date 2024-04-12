import { Controller, Get } from '@nestjs/common';
import { FlightsService } from './flights.service';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Get()
  async fetchAll(): Promise<any> {
    return this.flightsService.findAll();
  }
}
