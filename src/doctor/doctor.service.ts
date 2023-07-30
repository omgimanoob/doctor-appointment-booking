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

  async create(data: Partial<Doctor>): Promise<Doctor> {
    const obj = this.repo.create(data);
    return this.repo.save(obj);
  }

  async update(obj: Doctor, newData: Doctor): Promise<Doctor> {
    obj.name = newData.name;
    obj.specialty = newData.specialty;
    obj.minsPerSlot = newData.minsPerSlot;
    return this.repo.save(obj);
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



  async remove(id: number): Promise<boolean> {
    const deleteResult = await this.repo.delete(id);
    return deleteResult.affected > 0;
  }
}