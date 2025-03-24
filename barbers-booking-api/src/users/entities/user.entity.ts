import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { RoleType } from 'src/roles/roles.model';
import { Appointment } from 'src/appointments/entities/appointment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: 'enum',
    enum: RoleType,
    default: RoleType.USER,
  })
  role: RoleType;

  @Column('text', {
    array: true,
    default: [],
    nullable: true,
  })
  refreshTokens: string[];

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];

  // @OneToOne(() => UserDetails, (userDetails) => userDetails.user)
  // @JoinColumn()
  // userDetails: UserDetails;
}
