import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Barber } from 'src/barbers/entities/barber.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';

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

  @Column({ nullable: true })
  time: string;

  @ManyToOne(() => Barber, (barber) => barber.schedules)
  barber: Barber;

  @OneToOne(() => Appointment, (appointment) => appointment.schedule)
  appointment: Appointment;
}
