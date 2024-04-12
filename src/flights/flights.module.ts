import { Module } from '@nestjs/common';
import { FlightsController } from './flights.controller';
import { FlightsService } from './flights.service';
import { FetchSource1Service, FetchSource2Service } from '../datasources';

@Module({
  imports: [],
  controllers: [FlightsController],
  providers: [FlightsService, FetchSource1Service, FetchSource2Service],
})
export class FlightsModule {}
