import { Module } from "@nestjs/common";
import { ZoneService } from "./zone.service";
import { ZoneController } from "./zone.controller";
import { Zone, ZoneSchema } from "@src/schemas/zone.schema";
import { MongooseModule } from "@nestjs/mongoose/dist/mongoose.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Zone.name, schema: ZoneSchema }]),
  ],
  controllers: [ZoneController],
  providers: [ZoneService],
})
export class ZoneModule {}
