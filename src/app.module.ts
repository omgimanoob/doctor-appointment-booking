import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './doctor/doctor'; 
import { SpecificEvent } from './specific-event/specific-event'; 
import { AlternateEvent } from './alternate-event/alternate-event'; 
import { RepeatEvent } from './repeat-event/repeat-event'; 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', //change this
      password: '', //change this
      database: 'doctor_appointment_booking', //change this
      entities: [Doctor, SpecificEvent, AlternateEvent, RepeatEvent],
      synchronize: true,
    }),
  ],
})
export class AppModule {}