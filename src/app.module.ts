import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './doctor/doctor'; 
import { SpecificEvent } from './specific-event/specific-event'; 
import { AlternateEvent } from './alternate-event/alternate-event'; 
import { RepeatEvent } from './repeat-event/repeat-event'; 
import { DoctorModule } from './doctor/doctor.module';

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
    DoctorModule,
  ],
})
export class AppModule {}