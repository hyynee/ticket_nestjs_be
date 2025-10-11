import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './config/database.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserModule } from './user/user.module';
import { GoogleStrategy } from './strategy/google.strategy';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, GoogleStrategy],
})
export class AppModule {}
