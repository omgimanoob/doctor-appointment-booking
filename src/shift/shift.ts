import { Entity, Column, PrimaryGeneratedColumn, ManyToOne  } from 'typeorm';
import { Doctor } from '../doctor/doctor'; 
@Entity()
export class Shift {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  weekday: number;

  @Column({ type: 'time' })
  startTime: Date;
  
  @Column({ type: 'time' })
  endTime: Date;


  @ManyToOne (()=>Doctor,(doctor)=>doctor.shifts, { eager: true }) 
  doctor: Doctor;

}