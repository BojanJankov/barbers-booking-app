import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Barber } from 'src/barbers/entities/barber.entity';
import { Service } from 'src/services/entities/service.entity';

export type AppointmentStatus = 'pending' | 'accepted' | 'rejected';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  time: string;

  @Column()
  clientName: string;

  @Column()
  clientPhone: string;

  @Column()
  clientEmail: string;

  @ManyToOne(() => Barber, (barber) => barber.appointments)
  barber: Barber;

  @ManyToOne(() => Service, (service) => service.id)
  service: Service;

  @Column({
    type: 'enum',
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  })
  status: AppointmentStatus;

  @CreateDateColumn()
  createdAt: Date;
}
