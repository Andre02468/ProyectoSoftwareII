import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hotelId: number;

  @Column({ length: 100 })
  clientName: string;

  @Column({ length: 100 })
  clientEmail: string;

  @Column({ type: 'datetime' })
  date: Date;

  @Column({
    type: 'enum',
    enum: ['pending', 'accepted', 'rejected', 'cancelled'],
    default: 'pending'
  })
  status: string;
}