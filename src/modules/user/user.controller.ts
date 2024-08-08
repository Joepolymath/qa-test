import { Crud, CrudController } from '@dataui/crud';
import { User } from './entities/user.entity';
import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

@Crud({
  model: {
    type: User,
  },
})
@Controller('users')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}
}
