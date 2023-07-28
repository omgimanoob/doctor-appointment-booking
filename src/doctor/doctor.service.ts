import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions  } from 'typeorm';
import { Doctor } from './doctor';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly repo: Repository<Doctor>,
  ) {}

  async create(doctorData: Partial<Doctor>): Promise<Doctor> {
    const doctor = this.repo.create(doctorData);
    return this.repo.save(doctor);
  }
  

  async findAll(): Promise<Doctor[]> {
    return this.repo.find();
  }

  async findOneById(id: number): Promise<Doctor | undefined> {
    const options: FindOneOptions<Doctor> = {
      where: { id: id },
    };
    return this.repo.findOne(options);
  }

  async update(doctor: Doctor, updatedDoctorData: Doctor): Promise<Doctor> {
    doctor.name = updatedDoctorData.name;
    doctor.specialty = updatedDoctorData.specialty;
    return this.repo.save(doctor);
  }

  async remove(id: number): Promise<boolean> {
    const deleteResult = await this.repo.delete(id);
    return deleteResult.affected > 0;
  }
}