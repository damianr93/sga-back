import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/modules/users/users.module';
import { UserProviders } from 'src/modules/users/users.providers';
import { DatabaseModule } from 'src/services/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config/envs';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: envs.JWT_SECTRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [...UserProviders, AuthService],
})
export class AuthModule {}
