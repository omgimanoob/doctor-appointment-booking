import { Injectable,NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions  } from 'typeorm';
import { Appointment } from './appointment';
import { Doctor } from '../doctor/doctor';
import { Shift } from '../shift/shift';
import { Slots } from '../slots/slots';
import { LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import moment from 'moment';
import { format } from 'date-fns';

import { Between } from 'typeorm';
@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly repo: Repository<Appointment>,
    // private readonly appointmentRepo: Repository<Appointment>,
    @InjectRepository(Doctor)
    private readonly doctorRepo: Repository<Doctor>,
    @InjectRepository(Shift)
    private readonly shiftRepo: Repository<Shift>,
  ) {}
  
  shiftToSlots(shift: Partial<Shift>) : Slots {
      let startTime = shift.startTime
      , endTime = shift.endTime

  }
  
  async createAppointment(doctorId: number, data: Partial<Appointment>): Promise<Appointment> {
   
    if (!data.timeStart) {
      throw new Error('timeStart is required');
    } 
    const options: FindOneOptions<Doctor> = {
        where: { id: doctorId },
        relations: ['appointments', 'shifts'],
      };
    const doctor = await this.doctorRepo.findOne(options);
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    data.duration = doctor.minsPerSlot

    const moment = require('moment');
    let hours = moment(data.timeStart).format('HH:mm:ss')
    , appointmentStart = moment(data.timeStart).toDate()
    , appointmentEnd = moment(data.timeStart).add( doctor.minsPerSlot,'minutes').toDate()
    , momentDateStart = moment(data.timeStart).format('YYYY/MM/DD HH:mm:ss')
    , momentDateEnd = moment(data.timeStart).add( doctor.minsPerSlot,'minutes').format('YYYY/MM/DD HH:mm:ss')

    // console.log(hours)
    // console.log(momentDateStart,momentDateEnd)
    const shift = doctor.shifts.find((s) => hours >= s.startTime && hours <= s.endTime);
    if (!shift) {
      throw new Error('The appointment time is outside the doctor\'s shift');
    }
    // const existingAppointments = await this.repo
    // .createQueryBuilder('appointment')
    // .where('appointment.doctorId = :doctorId', { doctorId }) 
    // .andWhere('appointment.timeStart BETWEEN :startDate AND :endDate', { momentDateStart, momentDateEnd })
    // .getMany();


    const existingAppointments = await this.repo.find({
      where: {
        doctor,
        timeStart: Between(appointmentStart,appointmentEnd)
      },
    });

    // console.log(existingAppointments)
    if (existingAppointments.length) {
      throw new Error('There is already an appointment scheduled for this doctor during the same time slot');
    }

    // data.timeStart = new Date(`2000-07-31 ${data.timeStart}`)
    data.timeStart =  moment(data.timeStart).toDate()

    const newAppointment = this.repo.create({
      ...data,
      doctor,
    });

    return this.repo.save(newAppointment);
  }

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
  // Find all appointments associated with a specific doctor
  async findAllByDoctor(doctor: Doctor): Promise<Appointment[]> {
    return this.repo.find({
      where: { doctor: doctor }, // Filter by the doctor's ID
    });
  }


  async remove(id: number): Promise<boolean> {
    const deleteResult = await this.repo.delete(id);
    return deleteResult.affected > 0;
  }
}