import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Schedule } from 'src/schedules/entities/schedule.entity';

@Entity()
export class Barber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @OneToMany(() => Appointment, (appointment) => appointment.barber)
  appointments: Appointment[];

  @OneToMany(() => Schedule, (schedule) => schedule.barber)
  schedules: Schedule[];
}
