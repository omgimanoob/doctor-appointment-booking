import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './doctor';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor])], 
  controllers: [DoctorController],
  providers: [DoctorService]
})
export class DoctorModule {}
