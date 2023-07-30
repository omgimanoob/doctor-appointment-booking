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



  shiftToSlots(shift: Partial<Shift>, doctor: Partial<Doctor>) : any {
    const moment = require('moment');
      let slots = []
      , duration = doctor.minsPerSlot
      , startTime = shift.startTime
      , cumulativeTime = shift.startTime
      , endTime = shift.endTime
      , inputFormat = "DD-MM-YYYY HH:mm:ss"
      , anyDate = '31-07-1995'
      , momentStart = moment(`${anyDate} ${startTime}`, inputFormat)
      , momentEnd = moment(`${anyDate} ${endTime}`, inputFormat)
      , shiftMins = momentEnd.diff(momentStart,'minutes')
      , numSlots = Math.floor(shiftMins/duration)

      // console.log(numSlots,shiftMins)

      for (let i = numSlots; i > 0; i--) {
        let slotStartMoment = moment(`${anyDate} ${cumulativeTime}`, inputFormat)
        , slotEndMoment = moment(`${anyDate} ${cumulativeTime}`, inputFormat).add( duration,'minutes')
        , slot = {
          // number : i,
          weekday : shift.weekday,
          startTime : slotStartMoment.format('HH:mm:ss'),
          endTime :  slotEndMoment.subtract(1,'seconds').format('HH:mm:ss'),
        }
        cumulativeTime = slotEndMoment.add(1,'seconds').format('HH:mm:ss')
        slots.push(slot)
      }
      return slots
  }

  async getSlots(doctorId:number) {
    const options: FindOneOptions<Doctor> = {
      where: { id: doctorId },
      relations: ['shifts'],
    };
    const doctor = await this.doctorRepo.findOne(options);
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    let retVal = []
    doctor.shifts.forEach((shift)=>{
      let slots = this.shiftToSlots(shift, doctor)
      slots.forEach((slot)=>{
        retVal.push(slot)
      })
    })

    return retVal

  }
  
  
  async createAppointment(doctorId: number, data: Partial<Appointment>): Promise<Appointment> {
   
    if (!data.timeStart) {
      throw new Error('timeStart is required');
    } 
    const options: FindOneOptions<Doctor> = {
        where: { id: doctorId },
        // relations: ['appointments', 'shifts'],
        relations: ['shifts'],
      };
    const doctor = await this.doctorRepo.findOne(options);
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    data.duration = doctor.minsPerSlot

    const moment = require('moment');
    let inputFormat = "DD-MM-YYYY HH:mm:ss"
    , momentStart = moment(data.timeStart)
    , date = momentStart.format('DD-MM-YYYY')
    , hours = momentStart.format('HH:mm:ss')
    , startOfDay = moment(`${date} 00:00:00`,inputFormat).toDate()
    , endOfDay = moment(`${date} 23:59:59`,inputFormat).toDate()
    , appointmentStart = momentStart.toDate()
    , appointmentEnd = momentStart.add( doctor.minsPerSlot,'minutes').toDate()
    , dayOfWeek = momentStart.day() //1-6: mon-sat, 0:sun
    const shift = doctor.shifts.find(
      (s) => hours >= s.startTime
      && hours <= s.endTime
      && dayOfWeek == s.weekday
    );
    if (!shift) {
      throw new Error(`The appointment time is outside of ${doctor.name}'s shift`);
    }
    let slots = this.shiftToSlots(shift, doctor)
  

    const existingAppointments = await this.repo.find({
      where: {
        doctor,
        // timeStart: Between(appointmentStart,appointmentEnd),
        timeStart: Between(startOfDay,endOfDay),
      },
    });


    slots.forEach((slot)=>{
      let slotStartMoment =  slot.momentObj = moment(`${date} ${slot.startTime}`,inputFormat)
      , dateObj = slotStartMoment.toDate()
      , appt = existingAppointments.find(
        s => dateObj >= s.timeStart
        && dateObj <= s.timeStart
      )
      slot.available = typeof appt === 'undefined'
      slot.appointment = appt ?? null
    })


    let tryBookThisSlot = slots.find(
        s => hours >= s.startTime
        && hours <= s.endTime
      )

      console.log(hours,tryBookThisSlot)
    if (!tryBookThisSlot.available) {
      throw new Error(`An exlsiting appointment already scheduled for ${doctor.name} from ${tryBookThisSlot.startTime}-${tryBookThisSlot.endTime}` );
    }

    data.timeStart = tryBookThisSlot.momentObj.toDate()

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