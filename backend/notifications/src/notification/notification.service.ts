import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notification, NotificationDocument } from './schemas/notification.schema';
import { Model } from 'mongoose';
import * as nodemailer from 'nodemailer';
import { CreateNotificationDto } from './notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
  ) {}

  async createNotification(dto: CreateNotificationDto) {
    const notification = new this.notificationModel(dto);
    await notification.save();

    if (!process.env.EMAIL_HOST || !process.env.EMAIL_PORT || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('❌ Faltan variables de entorno para el correo electrónico.');
      return notification;
    }
    
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT), 
      secure: false, // true para puerto 465, false para 587
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
    return this.notificationModel.find({ userEmail: email });
  }
}
