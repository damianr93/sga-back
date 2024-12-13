import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/modules/users/users.module';
import { UserProviders } from 'src/modules/users/users.providers';
import { DatabaseModule } from 'src/services/database/database.module';

@Module({
  imports: [UsersModule, DatabaseModule],
  controllers: [AuthController],
  providers: [...UserProviders, AuthService]
})
export class AuthModule {}
