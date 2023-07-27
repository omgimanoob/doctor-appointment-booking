import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SpecificEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'time' })
  startTime: Date;

  @Column({ type: 'time' })
  endTime: Date;
}