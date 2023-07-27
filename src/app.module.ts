// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './doctor.entity'; // Create this entity later
import { SpecificEvent } from './specific-event.entity'; // Create this entity later
import { AlternateEvent } from './alternate-event.entity'; // Create this entity later
import { RepeatEvent } from './repeat-event.entity'; // Create this entity later

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
