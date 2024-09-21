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
import { NotificationSettingsService } from './notification_settings.service';
import { NotificationSettingsDto } from './dto/notification_settings.dto';
import { NotificationSettingsFilterDto } from './dto/notification_settings_filter.dto';
import { NotificationSettings } from './entities/notification_settings.entity';
import { NotificationSettingsUpdateDto } from './dto/notification_settings_update.dto';
import { EventTypeEnum } from 'src/constants/event_type.enum';

@Controller('notification_settings')
export class NotificationSettingsController {
  constructor(
    private readonly _notificationSettingsService: NotificationSettingsService
  ) {}

  @Post('/')
  async createNotificationSettings(
    @Body() notificationSetting: NotificationSettingsDto
  ): Promise<{
    statusCode: HttpStatus;
    message: string;
  }> {
    try {
      const result =
        await this._notificationSettingsService.createNotificationSettings(
          notificationSetting
        );
      if (result.status === 'ALREADY_PRESENT') {
        return {
          statusCode: HttpStatus.CONFLICT,
          message: result.message,
        };
      }

      return {
        statusCode: HttpStatus.CREATED,
        message: result.message,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to create notification setting',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('/')
  async findNotificationSettings(
    @Query() notificationSettingsFilter: NotificationSettingsFilterDto
  ): Promise<NotificationSettings[]> {
    const notificationSettings =
      await this._notificationSettingsService.findNotificationsSettings(
        notificationSettingsFilter
      );

    return notificationSettings;
  }

  @Post('update/:eventType')
  async updateNotificationSettings(
    @Body() notificationUpdateSettings: NotificationSettingsUpdateDto,
    @Param('eventType', new ParseEnumPipe(EventTypeEnum))
    eventType: EventTypeEnum
  ): Promise<{
    message: string;
  }> {
    const updatedSettings =
      await this._notificationSettingsService.updateNotificationSettings(
        eventType,
        notificationUpdateSettings
      );
    return updatedSettings;
  }

  @Get('/:eventType')
  async findOneNotificationSetting(
    @Param('eventType', new ParseEnumPipe(EventTypeEnum))
    eventType: EventTypeEnum
  ): Promise<NotificationSettings> {
    const notificationSettings =
      await this._notificationSettingsService.findOneNotificationSetting(
        eventType
      );

    return notificationSettings;
  }
}
