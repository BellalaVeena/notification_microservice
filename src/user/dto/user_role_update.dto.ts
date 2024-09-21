import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsNotEmpty } from 'class-validator';
import { RoleEnum } from 'src/constants/role.enum';

export class UserRoleUpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  @IsEnum(RoleEnum)
  role: RoleEnum;
}
