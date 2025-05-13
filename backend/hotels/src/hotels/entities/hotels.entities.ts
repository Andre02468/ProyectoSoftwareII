import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Habitacion } from '../../rooms/entities/rooms.entity';

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 50 })
  location: string;

  @Column({ length: 255, nullable: true })
  description?: string;

  @OneToMany(() => Habitacion, habitacion => habitacion.hotel)
  habitaciones: Habitacion[];
}