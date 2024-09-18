import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './bootstrap/database.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ConfigModule } from '@nestjs/config';

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
          global: true
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
