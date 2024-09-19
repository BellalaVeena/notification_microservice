import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsEnum } from 'class-validator';
import { EventTypeEnum } from 'src/constants/event_type.enum';

export class NotificationSettingsUpdateDto {
  @IsDefined()
  @IsBoolean()
  @ApiProperty({ type: Boolean })
  muted: boolean;
}
