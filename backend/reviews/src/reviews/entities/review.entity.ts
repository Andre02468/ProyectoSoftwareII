import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reservationId: number;

  @Column()
  hotelId: number;

  @Column()
  userId: number;

  @Column({ length: 500 })
  comment: string;

  @Column({ type: 'tinyint' })
  rating: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}