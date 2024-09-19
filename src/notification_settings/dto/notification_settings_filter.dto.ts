import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsInt, IsPositive, Min } from 'class-validator';
import { EventTypeEnum } from 'src/constants/event_type.enum';
import {
  PAGINATION_DEFAULT_LIMIT,
  PAGINATION_DEFAULT_OFFSET,
} from 'src/constants/pagination.constants';

export class NotificationSettingsFilterDto {
  @IsEnum(EventTypeEnum)
  @ApiPropertyOptional({ enum: EventTypeEnum })
  eventType?: EventTypeEnum;

  @IsBoolean()
  @ApiPropertyOptional({ type: Boolean })
  muted?: boolean;

  @IsPositive()
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({
    default: PAGINATION_DEFAULT_OFFSET,
    description: `Page number. Default: ${PAGINATION_DEFAULT_OFFSET}`,
  })
  offset?: number = PAGINATION_DEFAULT_OFFSET;

  @IsPositive()
  @IsInt()
  @ApiPropertyOptional({
    default: PAGINATION_DEFAULT_LIMIT,
    description: `Page size. Default: ${PAGINATION_DEFAULT_LIMIT}`,
  })
  limit?: number = PAGINATION_DEFAULT_LIMIT;
}
