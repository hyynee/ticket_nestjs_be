import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString, IsInt, Min } from "class-validator";
import { Type } from "class-transformer";

export class QueryEventDTO {
  @ApiProperty({ description: "Tìm kiếm theo tiêu đề", required: false })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({
    description: "Lọc theo trạng thái",
    enum: ["draft", "active", "inactive", "ended"],
    required: false,
  })
  @IsEnum(["draft", "active", "inactive", "ended"])
  @IsOptional()
  status?: "draft" | "active" | "inactive" | "ended";

  @ApiProperty({ description: "Số trang", required: false, default: 1 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  page?: number = 1;

  @ApiProperty({
    description: "Số lượng item trên 1 trang",
    required: false,
    default: 10,
  })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  limit?: number = 10;
}
