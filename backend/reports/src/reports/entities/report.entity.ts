import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hotelId: number;

  @Column()
  roomId: number;

  @Column({ type: 'datetime' })
  start: Date;

  @Column({ type: 'datetime' })
  end: Date;

  @Column({ 
    type: 'enum', 
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'confirmed'
  })
  status: string;
}