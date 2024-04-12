import { Module } from '@nestjs/common';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightsModule } from './flights/flights.module';

// cache interceptor applied to the entire application
// to avoid excessive boilerplate code in the controllers and services
// for the sake of this example, the cache is set to 5 seconds
@Module({
  imports: [
    FlightsModule,
    CacheModule.register({
      ttl: 60 * 60 * 1000, // 1 hour in milliseconds
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
