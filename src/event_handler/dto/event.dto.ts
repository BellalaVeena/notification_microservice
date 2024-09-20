import { EventTypeEnum } from 'src/constants/event_type.enum';

export class EventDto {
  eventType: EventTypeEnum;
  message: string;
}
