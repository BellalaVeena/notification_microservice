import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsPositive, IsInt, Min } from 'class-validator';
import {
  PAGINATION_DEFAULT_OFFSET,
  PAGINATION_DEFAULT_LIMIT,
} from 'src/constants/pagination.constants';

export class PaginationDto {
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
