import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseEnumPipe,
  Post,
  Query,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationFilterDto } from './dto/notification.filter';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly _notificationService: NotificationService) {}

  @Get('/')
  async findOneNotificationSetting(
    @Query() notificationFilter: NotificationFilterDto
  ): Promise<Notification[]> {
    const notifications =
      await this._notificationService.getAllNotifications(notificationFilter);

    return notifications;
  }
}
