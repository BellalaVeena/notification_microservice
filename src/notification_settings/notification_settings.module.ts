import { Module } from '@nestjs/common';
import { NotificationSettingsService } from './notification_settings.service';
import { NotificationSettingsController } from './notification_settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationSettings } from './entities/notification_settings.entity';
import { RedisService } from 'src/redis/redis.service';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationSettings])],
  controllers: [NotificationSettingsController],
  providers: [NotificationSettingsService, RedisService],
})
export class NotificationSettingsModule {}
