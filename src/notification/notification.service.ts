import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entity/notification.entity';
import { NotificationFilterDto } from './dto/notification.filter';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly _notificationRepo: Repository<Notification>
  ) {}

  async postNotification(eventTypeId: number, message: string) {
    try {
      await this._notificationRepo.save({
        eventTypeId,
        message,
      });
      return {
        message: 'Message stored successfully!',
      };
    } catch (error) {
      throw new InternalServerErrorException(`Could not store message!`);
    }
  }

  async getAllNotifications(notificationFilter: NotificationFilterDto) {
    try {
      const queryBuilder = await this._notificationRepo
        .createQueryBuilder('notification')
        .leftJoin('notification.notificationSettings', 'notificationSettings');
      if (notificationFilter.eventType) {
        queryBuilder.where(`notificationSettings.eventType = :eventType`, {
          eventType: notificationFilter.eventType,
        });
      }
      queryBuilder
        .select([
          'notification.*',
          'notificationSettings.eventType as eventType',
        ])
        .offset(notificationFilter.offset)
        .limit(notificationFilter.limit);
      return queryBuilder.getRawMany();
    } catch (error) {
        throw new InternalServerErrorException('Could fetch data!')
    }
  }
}
