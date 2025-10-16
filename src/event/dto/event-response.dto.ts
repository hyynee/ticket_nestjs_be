import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class EventResponseDTO {
  @ApiProperty()
  @Expose()
  _id: string;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  startDate: Date;

  @ApiProperty()
  @Expose()
  endDate: Date;

  @ApiProperty()
  @Expose()
  location: string;

  @ApiProperty()
  @Expose()
  thumbnail: string;

  @ApiProperty({ enum: ["draft", "active", "inactive", "ended"] })
  @Expose()
  status: "draft" | "active" | "inactive" | "ended";

  @ApiProperty()
  @Expose()
  createdBy: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  @ApiProperty()
  @Expose()
  isActiveNow: boolean;
}
