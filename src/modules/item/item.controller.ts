import {
  Crud,
  CrudController,
  CrudRequest,
  CrudRequestInterceptor,
  Override,
  ParsedRequest,
} from '@dataui/crud';
import { Item } from './entities/item.entity';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto, UpdateItemDto } from './dto/create-item.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../user/entities/user.entity';

@Crud({
  model: {
    type: Item,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  dto: {
    create: CreateItemDto,
    update: UpdateItemDto,
  },
  query: {
    join: {
      user: { eager: false },
    },
  },
})
@Controller('items')
@UseGuards(AuthGuard())
export class ItemController implements CrudController<Item> {
  constructor(public service: ItemService) {}

  @Post()
  @UseInterceptors(CrudRequestInterceptor)
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @Body() dto: CreateItemDto,
    @GetUser() user: User,
  ): Promise<Item> {
    dto.user = user;
    return await this.service.createOne(req, dto);
  }

  @Override('getManyBase')
  @UseInterceptors(CrudRequestInterceptor)
  getMany(@ParsedRequest() req: CrudRequest, @GetUser() user: User) {
    return this.service.getManyItems(req, user.id);
  }
}
