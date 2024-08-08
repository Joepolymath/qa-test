import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { HashingService } from 'src/common/libs/hashing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [ItemController],
  providers: [
    ItemService,
    UserService,
    AuthService,
    HashingService,
    JwtService,
    ConfigService,
  ],
  imports: [TypeOrmModule.forFeature([Item, User]), AuthModule],
})
export class ItemModule {}
