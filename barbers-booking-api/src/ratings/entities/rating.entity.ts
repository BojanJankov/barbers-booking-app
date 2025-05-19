import { Barber } from 'src/barbers/entities/barber.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  rating: number;

  @ManyToOne(() => Barber, (barber) => barber.ratings, { onDelete: 'CASCADE' })
  @JoinColumn()
  barber: Barber;
}
