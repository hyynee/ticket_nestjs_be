import { Controller } from "@nestjs/common";
import { ZoneService } from "./zone.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Zone")
@Controller("zone")
export class ZoneController {
  constructor(private readonly zoneService: ZoneService) {}
}
