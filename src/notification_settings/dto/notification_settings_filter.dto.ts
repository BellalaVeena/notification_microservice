import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum } from 'class-validator';
import { PaginationDto } from 'src/common/pagination.dto';
import { EventTypeEnum } from 'src/constants/event_type.enum';

export class NotificationSettingsFilterDto extends PaginationDto {
  @IsEnum(EventTypeEnum)
  @ApiPropertyOptional({ enum: EventTypeEnum })
  eventType?: EventTypeEnum;

  @IsBoolean()
  @ApiPropertyOptional({ type: Boolean })
  muted?: boolean;
}
