import {
  Body,
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationFilterDto } from './dto/notification.filter';
import { JwtAuthGuard } from 'src/auth/jwt_auth.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RoleGuard } from 'src/auth/roles/roles.guard';
import { RoleEnum } from 'src/constants/role.enum';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly _notificationService: NotificationService) {}

  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('/')
  async findOneNotificationSetting(
    @Query() notificationFilter: NotificationFilterDto
  ): Promise<Notification[]> {
    const notifications =
      await this._notificationService.getAllNotifications(notificationFilter);
      return notifications;
  }
}
