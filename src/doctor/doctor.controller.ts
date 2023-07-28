import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { Doctor } from './doctor';

@Controller('doctors')
export class DoctorController {
    
  constructor(private readonly service: DoctorService) {}

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
  async update(@Param('id') id: number, @Body() data: Doctor): Promise<void> {
    const doctor = await this.service.findOneById(id);
    if (!doctor) {
      throw new HttpException('Doctor not found', HttpStatus.NOT_FOUND);
    }
    
    // if (this.isSameData(doctor, data)) {
    //   throw new HttpException('No changes to update', HttpStatus.NO_CONTENT);
    // }

    await this.service.update(doctor, data);
  }

  @Delete(':id')
  async deleteDoctor(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.service.remove(id);
  }


//   private isSameData(existingData: Doctor, newData: Doctor): boolean {
//     return existingData.name === newData.name &&
//     existingData.specialty === newData.specialty;
//   }

  
}