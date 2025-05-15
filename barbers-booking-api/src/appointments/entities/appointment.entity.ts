import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Barber } from 'src/barbers/entities/barber.entity';
import { Service } from 'src/services/entities/service.entity';
import { Schedule } from 'src/schedules/entities/schedule.entity';

export type AppointmentStatus = 'pending' | 'accepted' | 'rejected';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clientName: string;

  @Column()
  clientPhone: string;

  @Column()
  clientEmail: string;

  @ManyToOne(() => Barber, (barber) => barber.appointments, { eager: true })
  @JoinColumn()
  barber: Barber;

  @ManyToOne(() => Service, (service) => service.id, { eager: true })
  @JoinColumn()
  service: Service;

  @OneToOne(() => Schedule, (schedule) => schedule.appointment)
  @JoinColumn()
  schedule: Schedule;

  @CreateDateColumn()
  createdAt: Date;
}
