import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signUp(signUpDto: CreateUserDto) {
    return this.userService.create(signUpDto);
  }

  async signIn(signInDto: SignInDto) {
    try {
      const { email, password } = signInDto;
      const user = (await this.userService.findOneByEmail(email)).data;
      if (!bcrypt.compareSync(password, user.password)) {
        throw new UnauthorizedException();
      }
      const payload = { sub: user.id, email: user.email };
      return {
        accessToken: await this.jwtService.signAsync(payload),
      };
    } catch (e) {
      if (e.status === 500) {
        throw new InternalServerErrorException(e.message);
      } else throw e;
    }
  }
}
