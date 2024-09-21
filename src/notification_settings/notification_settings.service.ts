import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { NotificationSettings } from './entities/notification_settings.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationSettingsDto } from './dto/notification_settings.dto';
import { RedisService } from 'src/redis/redis.service';
import { EventTypeEnum } from 'src/constants/event_type.enum';
import { NotificationSettingsFilterDto } from './dto/notification_settings_filter.dto';
import { NotificationSettingsUpdateDto } from './dto/notification_settings_update.dto';

@Injectable()
export class NotificationSettingsService {
  constructor(
    @InjectRepository(NotificationSettings)
    private readonly _notificationSettingsRepo: Repository<NotificationSettings>,
    private readonly _redisService: RedisService
  ) {}

  async findOneNotificationSetting(
    eventType: EventTypeEnum
  ): Promise<NotificationSettings> {
    try {
      let notificationSetting: NotificationSettings =
        await this._redisService.get(eventType);
      if (!notificationSetting) {
        notificationSetting = await this._notificationSettingsRepo.findOne({
          where: {
            eventType,
          },
        });
      }
      return notificationSetting;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createNotificationSettings(
    notificationSetting: NotificationSettingsDto
  ): Promise<{
    message: string;
    status: string;
  }> {
    try {
      let eventTypeSetting = await this.findOneNotificationSetting(
        notificationSetting.eventType
      );
      if (eventTypeSetting) {
        return {
          message: 'Notification setting already exists',
          status: 'ALREADY_PRESENT',
        };
      } else {
        const setting = await this._notificationSettingsRepo.save({
          eventType: notificationSetting.eventType,
          muted: notificationSetting.muted,
        });
        await this._redisService.set(notificationSetting.eventType, setting);
        return {
          message: 'Notification setting created successfully',
          status: 'CREATED',
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async findNotificationsSettings(
    notificationSettingsFilter: NotificationSettingsFilterDto
  ): Promise<NotificationSettings[]> {
    try {
      const queryBuilder = await this._notificationSettingsRepo
        .createQueryBuilder('notificationSetting')
        .select('*');
      if (notificationSettingsFilter.eventType) {
        queryBuilder.where('notificationSetting.eventType = :eventType', {
          eventType: notificationSettingsFilter.eventType,
        });
      }

      if (notificationSettingsFilter.muted) {
        queryBuilder.andWhere('notificationSetting.muted = :muted', {
          muted: notificationSettingsFilter.muted,
        });
      }
      queryBuilder.limit(notificationSettingsFilter.limit);
      queryBuilder.offset(notificationSettingsFilter.offset);

      return queryBuilder.getRawMany();
    } catch (error) {
      throw new InternalServerErrorException(
        'Could not fetch the list of notification settings'
      );
    }
  }

  async updateNotificationSettings(
    eventType: EventTypeEnum,
    notificationUpdateSettings: NotificationSettingsUpdateDto
  ): Promise<{
    message: string;
  }> {
    try {
      let eventTypeSetting = await this.findOneNotificationSetting(eventType);
      if (!eventTypeSetting) {
        throw new NotFoundException(`${eventType} is not found!`);
      }
      await this._notificationSettingsRepo.update(
        { eventType },
        {
          muted: notificationUpdateSettings.muted,
        }
      );
      await this._redisService.set(eventType, {
        id: eventTypeSetting.id,
        eventType,
        muted: notificationUpdateSettings.muted,
      });
      return { message: 'Notification settings updated successfully' };
    } catch (error) {
      throw error;
    }
  }
}
