import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CrudRequest, GetManyDefaultResponse } from '@dataui/crud';

@Injectable()
export class ItemService extends TypeOrmCrudService<Item> {
  constructor(@InjectRepository(Item) repo: Repository<Item>) {
    super(repo);
  }

  async createOne(req: CrudRequest, dto: DeepPartial<Item>): Promise<Item> {
    const newItem = this.repo.create(dto);
    newItem.userId = newItem.user.id;
    return await this.repo.save(newItem);
  }

  async getManyItems(
    req: CrudRequest,
    currentUser: string,
  ): Promise<Item[] | GetManyDefaultResponse<Item>> {
    req.parsed.search.$and.push({ userId: { $eq: currentUser } });
    const qb = await super.createBuilder(req.parsed, req.options);
    console.log(qb.getQueryAndParameters);
    return await super.getMany(req);
  }
}
