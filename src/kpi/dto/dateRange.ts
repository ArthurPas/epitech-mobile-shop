import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class DateRangeDto {
  @ApiProperty()
  @IsDateString()
  startDate: string;
  @ApiProperty({ required: false })
  endDate?: string;
}
