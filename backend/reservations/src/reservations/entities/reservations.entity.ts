import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../../users/entities/user.entity';
import { Habitacion } from '../../../rooms/entities/rooms.entity';

@Entity()
export class Reserva {
  @PrimaryGeneratedColumn()
  res_id: number;

  @ManyToOne(() => User)
  usuario: User;

  @ManyToOne(() => Habitacion)
  habitacion: Habitacion;

  @Column({ type: 'date' })
  res_fechaInicio: Date;

  @Column({ type: 'date' })
  res_fechaFin: Date;

  @Column({ length: 15, default: 'Pendiente' })
  res_estado: string;

  @Column({ type: 'date' })
  res_fechaCreacion: Date;
}