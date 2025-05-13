import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import * as nodemailer from 'nodemailer';
import { CreateNotificationDto } from './notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async createNotification(dto: CreateNotificationDto) {
    const notification = this.notificationRepository.create(dto);
    await this.notificationRepository.save(notification);

    // Configuración de nodemailer (igual que antes)
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_PORT || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('❌ Faltan variables de entorno para el correo electrónico.');
      return notification;
    }
    
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT), 
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: `"Reservas App" <${process.env.EMAIL_USER}>`,
        to: dto.userEmail,
        subject: `Notificación: ${dto.type}`,
        text: dto.message,
      });
      console.log(`Notificación enviada a ${dto.userEmail}: ${dto.message}`);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }

    return notification;
  }

  async getNotifications(email: string) {
    return this.notificationRepository.find({ 
      where: { userEmail: email },
      order: { createdAt: 'DESC' }
    });
  }
}