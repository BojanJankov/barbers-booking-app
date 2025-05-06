import { Barber } from 'src/barbers/entities/barber.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @ManyToOne(() => Barber, (barber) => barber.services)
  @JoinColumn({ name: 'barberId' })
  barber: Barber;
}
