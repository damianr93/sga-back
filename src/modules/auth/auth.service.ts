import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/users/interface/users.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_MODEL')
    private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new NotFoundException();
    }
    const isMatching = await bcrypt.compare(pass, user.password);

    if (!isMatching) {
      throw new UnauthorizedException();
    }

    const access_token = await this.jwtService.signAsync({
      sub: user.id,
      username: user.username,
      role: user.role,
    });

    return {
      id: user.id,
      username: user.username,
      role: user.role,
      sector: user.sector,
      access_token,
    };
  }
}
