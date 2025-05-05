import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // Crea una nueva notificación
  @Post()
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    return await this.notificationService.createNotification(createNotificationDto);
  }

  // Obtiene las notificaciones asociadas a un correo electrónico
  @Get(':email')
  async getByEmail(@Param('email') email: string) {
    return await this.notificationService.getNotifications(email);
  }
}

