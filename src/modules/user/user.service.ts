import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  private logger = new Logger(UserService.name);

  constructor(@InjectRepository(User) private userRepo: Repository<User>) {
    super(userRepo);
  }
}
