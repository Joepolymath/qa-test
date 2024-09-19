import { CustomBaseEntity } from 'src/common/libs/base-entity';
import { Item } from 'src/modules/item/entities/item.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('users')
export class User extends CustomBaseEntity {
  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Item, (item) => item.user)
  items: Item[];
}
