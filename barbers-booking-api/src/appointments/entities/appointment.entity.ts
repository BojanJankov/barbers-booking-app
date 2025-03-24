import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Barber } from 'src/barbers/entities/barber.entity';
import { Service } from 'src/services/entities/service.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dateTime: Date;

  @ManyToOne(() => User, (user) => user.appointments)
  user: User;

  @ManyToOne(() => Barber, (barber) => barber.appointments)
  barber: Barber;

  @ManyToOne(() => Service, (service) => service.id)
  service: Service;
}
