import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './bootstrap/database.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ConfigModule } from '@nestjs/config';
import { NotificationSettingsModule } from './notification_settings/notification_settings.module';
import { RedisService } from './redis/redis.service';
import { EventHandlerModule } from './event_handler/event_handler.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    RedisModule.forRootAsync({
      useFactory: () => ({
        type: 'single',
        config: {
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
          global: true,
        },
      }),
    }),
    NotificationSettingsModule,
    EventHandlerModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService, RedisService],
})
export class AppModule {}
