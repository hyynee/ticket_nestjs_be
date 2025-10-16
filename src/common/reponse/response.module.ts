import { Module, Global } from "@nestjs/common";
import { ResponseService } from "./response.services";

@Global()
@Module({
  providers: [ResponseService],
  exports: [ResponseService],
})
export class ResponseModule {}
