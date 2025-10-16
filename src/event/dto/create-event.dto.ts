import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsEnum,
  IsOptional,
  IsUrl,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateEventDTO {
  @ApiProperty({ description: "Tiêu đề sự kiện" })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: "Mô tả sự kiện", required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: "Ngày bắt đầu",
    example: "2025-10-15T09:00:00.000Z",
  })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({
    description: "Ngày kết thúc",
    example: "2025-10-15T18:00:00.000Z",
  })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty({ description: "Địa điểm tổ chức" })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ description: "Link ảnh thumbnail", required: false })
  @IsUrl()
  @IsOptional()
  thumbnail?: string;

  @ApiProperty({
    description: "Trạng thái sự kiện",
    enum: ["draft", "active", "inactive", "ended"],
    default: "draft",
  })
  @IsEnum(["draft", "active", "inactive", "ended"])
  @IsOptional()
  status?: "draft" | "active" | "inactive" | "ended";
}
