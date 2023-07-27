import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AlternateEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ type: 'time' })
  startTime: Date;

  @Column({ type: 'time' })
  endTime: Date;

  @Column()
  target: string;

  @Column()
  value: number;

  // Add other alternate event-related properties here
}