import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './doctor/doctor'; 
import { Appointment } from './appointment/appointment'; 
import { Shift } from './shift/shift'; 
// import { SpecificEvent } from './specific-event/specific-event'; 
// import { AlternateEvent } from './alternate-event/alternate-event'; 
// import { RepeatEvent } from './repeat-event/repeat-event'; 
import { DoctorModule } from './doctor/doctor.module';
import { AppointmentModule } from './appointment/appointment.module';
import { ShiftModule } from './shift/shift.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', //change this
      password: '', //change this
      database: 'doctor_appointment_booking', //change this
      // entities: [Doctor, SpecificEvent, AlternateEvent, RepeatEvent, Appointment],
      entities: [Doctor, Appointment, Shift],
      synchronize: true,
    }),
    DoctorModule,
    AppointmentModule,
    ShiftModule,
  ],
  controllers: [],
})
export class AppModule {}