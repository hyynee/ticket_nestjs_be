// create-zone.dto.ts
import {
  IsMongoId,
  IsString,
  IsNumber,
  IsPositive,
  Min,
  IsOptional,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateZoneDto {
  @IsMongoId()
  @IsString()
  eventId: string;

  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  price: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  capacity?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  soldCount?: number;
}
