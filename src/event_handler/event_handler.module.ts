import { Logger, Module } from '@nestjs/common';
import { EventHandlerController } from './event_handler.controller';
import { EventHandlerService } from './event_handler.service';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationSettingsService } from 'src/notification_settings/notification_settings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from '../notification/entity/notification.entity';
import { NotificationSettings } from 'src/notification_settings/entities/notification_settings.entity';
import { RedisService } from 'src/redis/redis.service';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, NotificationSettings])],
  controllers: [EventHandlerController],
  providers: [
    EventHandlerService,
    NotificationService,
    NotificationSettingsService,
    RedisService,
    Logger,
  ],
})
export class EventHandlerModule {}
