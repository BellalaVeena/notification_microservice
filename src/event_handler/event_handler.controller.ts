import { BadRequestException, Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EventHandlerService } from './event_handler.service';
import { EventDto } from './dto/event.dto';

@Controller()
export class EventHandlerController {
  constructor(private _eventHandlerService: EventHandlerService) {}

  /* To avoid the duplication of code,  instead of writing 10 events
    trying to receiving from event called as notification,
    and if the mentioned pattern matches with event name then accessing service or throwing error
      */

  @EventPattern('notification')
  handleNotification(@Payload() event: EventDto) {
    if (event.eventType.match(/^EVENT([1-9]|10)$/)) {
      return this._eventHandlerService.handleNotification(event);
    } else {
      throw new BadRequestException('unknown event');
    }
  }
}
