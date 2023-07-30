import { Injectable,NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions  } from 'typeorm';
import { Shift } from './shift';

@Injectable()
export class ShiftService {
  constructor(
    @InjectRepository(Shift)
    private readonly repo: Repository<Shift>,
  ) {}

  async create(data: Partial<Shift>): Promise<Shift> {
    const obj = this.repo.create(data);
    return this.repo.save(obj);
  }

  async update(obj: Shift, newData: Shift): Promise<Shift> {
    obj = newData
    return this.repo.save(obj);
  }
  

  async findAll(): Promise<Shift[]> {
    return this.repo.find();
  }

  async findOneById(id: number): Promise<Shift | undefined> {
    const options: FindOneOptions<Shift> = {
      where: { id: id },
    };
    return this.repo.findOne(options);
  }



  async remove(id: number): Promise<boolean> {
    const deleteResult = await this.repo.delete(id);
    return deleteResult.affected > 0;
  }
}