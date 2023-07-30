import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, NotFoundException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { Doctor } from './doctor';
import { AppointmentService } from '../appointment/appointment.service'; // Import the AppointmentService
import { ShiftService } from '../shift/shift.service'; // Import the ShiftService
import { Appointment } from '../appointment/appointment';
import { Shift } from '../shift/shift';

@Controller('api/doctors')
export class DoctorController {
  constructor(
    private readonly service: DoctorService,
    private readonly appointmentService: AppointmentService, // Inject the AppointmentService
    private readonly shiftService: ShiftService, // Inject the ShiftService
  ) {}

  @Get()
  async findAll(): Promise<Doctor[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Doctor> {
    const doctor = await this.service.findOneById(id);
    if (!doctor) {
      throw new HttpException('Doctor not found', HttpStatus.NOT_FOUND);
    }
    return doctor;
  }

  @Post()
  async create(@Body() data: Doctor): Promise<Doctor> {
    return this.service.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Doctor): Promise<Doctor> {
    const doctor = await this.service.findOneById(id);
    if (!doctor) {
      throw new HttpException('Doctor not found', HttpStatus.NOT_FOUND);
    }

    const updatedDoctor = this.service.update(doctor, data);
    return updatedDoctor;
  }

  @Delete(':id')
  async deleteDoctor(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.service.remove(id);
  }

  // Create an appointment for a doctor
  @Post(':id/appointments')
  async createAppointment(@Param('id') doctorId: number, @Body() data: Partial<Appointment>): Promise<Appointment | any> {
    try {
      const appointment = await this.appointmentService.createAppointment(doctorId, data);
      return appointment;
    } catch (error) {
      throw new HttpException(error.message, (error instanceof NotFoundException) ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST);
    }
    
   

   
  }

  // Retrieve all appointments for a doctor
  @Get(':id/appointments')
  async getAppointments(@Param('id') doctorId: number): Promise<Appointment[]> {
    const doctor = await this.service.findOneById(doctorId);
    if (!doctor) {
      throw new HttpException('Doctor not found', HttpStatus.NOT_FOUND);
    }

    return this.appointmentService.findAllByDoctor(doctor);
  }

  // Create a shift for a doctor
  @Post(':id/shifts')
  async createShift(@Param('id') doctorId: number, @Body() data: Partial<Shift>): Promise<Shift> {
    const doctor = await this.service.findOneById(doctorId);
    if (!doctor) {
      throw new HttpException('Doctor not found', HttpStatus.NOT_FOUND);
    }

    // Ensure the shift data includes the doctor's ID
    data.doctor = doctor;
    return this.shiftService.create(data);
  }

  // Retrieve all shifts for a doctor
  @Get(':id/shifts')
  async getShifts(@Param('id') doctorId: number): Promise<Shift[]> {
    const doctor = await this.service.findOneById(doctorId);
    if (!doctor) {
      throw new HttpException('Doctor not found', HttpStatus.NOT_FOUND);
    }

    return this.shiftService.findAllByDoctor(doctor);
  }
}
