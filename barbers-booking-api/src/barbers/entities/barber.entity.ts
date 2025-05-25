import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Schedule } from 'src/schedules/entities/schedule.entity';
import { User } from 'src/users/entities/user.entity';
import { Rating } from 'src/ratings/entities/rating.entity';
import { Service } from 'src/services/entities/service.entity';

@Entity()
export class Barber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  phoneNumber: string;

  @Column({ nullable: false })
  experience: number;

  @Column({ nullable: false })
  image: string;

  @OneToOne(() => User, (user) => user.barber, { eager: true })
  @JoinColumn()
  user: User;

  @OneToMany(() => Appointment, (appointment) => appointment.barber)
  appointments: Appointment[];

  @OneToMany(() => Schedule, (schedule) => schedule.barber)
  schedules: Schedule[];

  @OneToMany(() => Service, (service) => service.barber)
  services: Service[];

  @OneToMany(() => Rating, (ratings) => ratings.barber, { onDelete: 'CASCADE' })
  ratings: Rating[];

  @CreateDateColumn()
  createdAt: Date;
}
