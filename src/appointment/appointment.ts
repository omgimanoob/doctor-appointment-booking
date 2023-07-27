import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ type: 'time' })
  startTime: Date;

  @Column({ type: 'int' })
  doctor: number;

  @Column({ type: 'time' })
  endTime: Date;

  @Column()
  target: 'day' | 'week' | 'month';

  @Column()
  value: number;

}