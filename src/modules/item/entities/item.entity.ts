import { CustomBaseEntity } from 'src/common/libs/base-entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('items')
export class Item extends CustomBaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.items)
  user: User;

  @Column({ type: 'uuid' })
  userId: string;
}
