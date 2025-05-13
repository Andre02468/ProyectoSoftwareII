import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Hotel } from '../../hotels/entities/hotels.entities';

@Entity('habitaciones')
export class Habitacion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Hotel, hotel => hotel.habitaciones)
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int' })
  beds: number;

  @Column({ type: 'varchar', length: 30 })
  type: string;

  @Column({ type: 'boolean', default: true })
  available: boolean;
}