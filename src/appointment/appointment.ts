import { Entity, Column, PrimaryGeneratedColumn, ManyToOne  } from 'typeorm';
import { Doctor } from '../doctor/doctor'; 
@Entity()
export class Appointment {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  timeStart: Date;

  @Column()
  duration: number;

  // @ManyToOne (()=>Doctor,(doctor)=>doctor.appointments)
  // doctor: Doctor;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments, { eager: true }) 
  doctor: Doctor;

}