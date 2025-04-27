import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Barber } from 'src/barbers/entities/barber.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  day: string;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column('text', { array: true })
  terms: string[];

  @ManyToOne(() => Barber, (barber) => barber.schedules)
  barber: Barber;
}
