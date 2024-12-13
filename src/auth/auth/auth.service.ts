import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/users/interface/users.interface';

@Injectable()
export class AuthService {

  constructor(
    @Inject('USER_MODEL')
    private readonly userModel: Model<User>,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
   
    const user = await this.userModel.findOne({username});

    const isMatching = await bcrypt.compare(pass, user.password)

    if (!isMatching) {

      throw new UnauthorizedException();

    }

    // TODO: Generate a JWT and return it here
  
    return {
      id: user.id,
      username: user.username,
      sector: user.sector
    };
  }
}
