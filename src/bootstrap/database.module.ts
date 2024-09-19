import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('HOST'),
        port: Number(configService.get<number>('DB_PORT')),
        username: configService.get('USERNAME'),
        password: configService.get('PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
        synchronize: false,
        migrations: [`${__dirname}/../database/migrations/*.js`],
        migrationsTableName: 'typeorm_migrations',
      }),
    }),
  ],
})
export class DatabaseModule {}
