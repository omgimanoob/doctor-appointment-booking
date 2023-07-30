import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { AppointmentService } from '../appointment/appointment.service';
import { ShiftService } from '../shift/shift.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './doctor';
import { Appointment } from '../appointment/appointment';
import { Shift } from '../shift/shift';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor, Appointment, Shift])], 
  controllers: [DoctorController],
  providers: [DoctorService, AppointmentService, ShiftService]
})
export class DoctorModule {}
