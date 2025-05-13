import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Habitacion } from '../../rooms/entities/rooms.entity';

@Entity('hoteles')
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ length: 255, nullable: false })
  location: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => Habitacion, habitacion => habitacion.hotel)
  habitaciones: Habitacion[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}