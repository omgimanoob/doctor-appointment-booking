import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Appointment } from './appointment';

@Controller('api/appointments')
export class AppointmentController {
    
  constructor(private readonly service: AppointmentService) {}

  @Get()
  async findAll(): Promise<Appointment[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Appointment> {
    const appointment = await this.service.findOneById(id);
    if (!appointment) {
      throw new HttpException('Appointment not found', HttpStatus.NOT_FOUND);
    }
    return appointment;
  }

  @Post()
  async create(@Body() data: Appointment): Promise<Appointment> {
    return this.service.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Appointment): Promise<Appointment> {
    const appointment = await this.service.findOneById(id);
    if (!appointment) {
      throw new HttpException('Appointment not found', HttpStatus.NOT_FOUND);
    }
    
    // if (this.isSameData(appointment, data)) {
    //   throw new HttpException('No changes to update', HttpStatus.NO_CONTENT);
    // }

    const updatedAppointment =  this.service.update(appointment, data);

    return updatedAppointment;
  }

  @Delete(':id')
  async deleteAppointment(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.service.remove(id);
  }


//   private isSameData(existingData: Appointment, newData: Appointment): boolean {
//     return existingData.name === newData.name &&
//     existingData.specialty === newData.specialty;
//   }

  
}