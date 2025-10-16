import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import config from "./config";

@Module({
  imports: [
    MongooseModule.forRoot(
      config.MONGODB_URI || "mongodb://localhost:27017/ticket"
    ),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
