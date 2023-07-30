import { Injectable,NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions  } from 'typeorm';
import { Appointment } from './appointment';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly repo: Repository<Appointment>,
  ) {}

  async create(data: Partial<Appointment>): Promise<Appointment> {
    const obj = this.repo.create(data);
    return this.repo.save(obj);
  }

  async update(obj: Appointment, newData: Appointment): Promise<Appointment> {
    obj = newData
    return this.repo.save(obj);
  }
  

  async findAll(): Promise<Appointment[]> {
    return this.repo.find();
  }

  async findOneById(id: number): Promise<Appointment | undefined> {
    const options: FindOneOptions<Appointment> = {
      where: { id: id },
    };
    return this.repo.findOne(options);
  }



  async remove(id: number): Promise<boolean> {
    const deleteResult = await this.repo.delete(id);
    return deleteResult.affected > 0;
  }
}