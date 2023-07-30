import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ShiftService } from './shift.service';
import { Shift } from './shift';

@Controller('api/shifts')
export class ShiftController {
    
  constructor(private readonly service: ShiftService) {}

  @Get()
  async findAll(): Promise<Shift[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Shift> {
    const shift = await this.service.findOneById(id);
    if (!shift) {
      throw new HttpException('Shift not found', HttpStatus.NOT_FOUND);
    }
    return shift;
  }

  @Post()
  async create(@Body() data: Shift): Promise<Shift> {
    return this.service.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Shift): Promise<Shift> {
    const shift = await this.service.findOneById(id);
    if (!shift) {
      throw new HttpException('Shift not found', HttpStatus.NOT_FOUND);
    }
    
    // if (this.isSameData(shift, data)) {
    //   throw new HttpException('No changes to update', HttpStatus.NO_CONTENT);
    // }

    const updatedShift =  this.service.update(shift, data);

    return updatedShift;
  }

  @Delete(':id')
  async deleteShift(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.service.remove(id);
  }


//   private isSameData(existingData: Shift, newData: Shift): boolean {
//     return existingData.name === newData.name &&
//     existingData.specialty === newData.specialty;
//   }

  
}