import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { UserService } from '../user/user.service';
import { HashingService } from 'src/common/libs/hashing';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IJwtPayload, IJwtUser } from './types/jwt.types';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(HashingService) private hashingService: HashingService,
    private readonly userService: UserService,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(payload: SignUpDto) {
    const { username, password } = payload;

    const foundUser = await this.userService.findOne({ where: { username } });

    if (foundUser) {
      throw new BadRequestException('Username already exists');
    }

    const salt = await this.hashingService.generateSalt(10);
    payload.password = await this.hashingService.hashPassword(password, salt);

    console.log('BEFORE CREATION', { payload });

    const newUser = await this.userRepo.create(payload);

    return await this.userRepo.save(newUser);
  }

  async login(payload: LoginDto) {
    const user = await this.userService.findOne({
      where: {
        username: payload.username,
      },
    });

    if (!user) {
      throw new NotFoundException('User not Found');
    }

    const passwordIsValid = await this.hashingService.compare(
      payload.password,
      user.password,
    );

    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid Password');
    }

    const accessToken = this.issueToken({
      id: user.id,
      username: user.username,
    });

    return {
      accessToken,
      user: {
        id: user.id,
        username: user.username,
      },
    };
  }

  async verify(payload: string): Promise<IJwtUser> {
    return await this.jwtService.verify(payload, {
      secret: this.configService.get('JWT_SECRET'),
    });
  }

  private issueToken(payload: IJwtPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
    });
  }
}
