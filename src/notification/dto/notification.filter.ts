import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsPositive, Min } from 'class-validator';
import { PaginationDto } from 'src/common/pagination.dto';
import { EventTypeEnum } from 'src/constants/event_type.enum';

export class NotificationFilterDto extends PaginationDto {
  @IsEnum(EventTypeEnum)
  @ApiPropertyOptional({ enum: EventTypeEnum })
  eventType?: EventTypeEnum;
}
