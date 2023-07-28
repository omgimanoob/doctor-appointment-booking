import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
// import { Appointment } from '../appointment/appointment';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;   

  @Column()
  name: string;

//   @OneToMany(() => Appointment, appointment => appointment.doctor)
//   appointments: Appointment[];
    
@Column()
  specialty: string;
}