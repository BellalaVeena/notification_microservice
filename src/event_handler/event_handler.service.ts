import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { EventDto } from './dto/event.dto';
import { NotificationSettingsService } from 'src/notification_settings/notification_settings.service';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class EventHandlerService {
  private readonly _logger = new Logger(EventHandlerService.name);

  constructor(
    private readonly _notificationSettingsService: NotificationSettingsService,
    private readonly _notificationService: NotificationService
  ) {}

  async handleNotification(event: EventDto) {
    try {
      const eventType = event.eventType;
      const eventDetails =
        await this._notificationSettingsService.findOneNotificationSetting(
          eventType
        );
      if (!eventDetails) {
        this._logger.warn('Please add notification settings for the event!');
        throw new BadRequestException(
          'Please add notification settings for the event!'
        );
      }
      const isEventMuted = eventDetails.muted;
      if (isEventMuted) {
        this._logger.error(`Notification can not be stored as event is muted!`);
        throw new BadRequestException(
          'Notification can not be stored as event is muted!'
        );
      }
      const notification = await this._notificationService.postNotification(
        eventDetails.id,
        event.message
      );
      this._logger.log(notification.message);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
