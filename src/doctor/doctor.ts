import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Appointment } from '../appointment/appointment';
import { Shift } from '../shift/shift';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;   

  @Column()
  name: string;

  @OneToMany(() => Appointment, appointment => appointment.doctor)
  appointments: Appointment[];

  @OneToMany(() => Shift, shift => shift.doctor)
  shifts: Shift[];


@Column()
minsPerSlot: number = 30
@Column()
  specialty: string = ""
}

    
