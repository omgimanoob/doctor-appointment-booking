import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointment';
import { Shift } from '../shift/shift';
import { Doctor } from '../doctor/doctor';



@Module({
  imports: [TypeOrmModule.forFeature([Appointment,Shift, Doctor])], 
  controllers: [AppointmentController],
  providers: [AppointmentService]
})
export class AppointmentModule {}
