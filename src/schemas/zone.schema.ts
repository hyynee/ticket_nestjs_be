// zone.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })
export class Zone extends Document {
  @Prop({ type: Types.ObjectId, ref: "Event", required: true })
  eventId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ type: Number, required: true, min: 0 })
  price: number;

  @Prop({ type: Number, default: 0, min: 0 })
  capacity: number;

  @Prop({ type: Number, default: 0, min: 0 })
  soldCount: number;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const ZoneSchema = SchemaFactory.createForClass(Zone);

ZoneSchema.index({ eventId: 1, name: 1 }, { unique: true });

ZoneSchema.index({ eventId: 1 });

ZoneSchema.index({ isDeleted: 1 });
