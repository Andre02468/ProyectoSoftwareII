// users/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('usuarios') // La tabla en DB sigue siendo 'usuarios'
@Unique(['username'])
@Unique(['email'])
export class User {  // Cambiado de Usuario a User
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  username: string;

  @Column({ length: 255, nullable: false })
  password: string;

  @Column({ length: 100, nullable: false })
  email: string;

  @Column('simple-array', { default: 'client' })
  roles: string[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}