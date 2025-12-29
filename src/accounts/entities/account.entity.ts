import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountType } from './account-type.entity';
import { User } from '../../auth/entities/user.entity';

@Entity({
  name: 'account',
})
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
  })
  name: string;

  @Column({
    type: 'text',
  })
  balance: string;

  @Column({
    name: 'number_account',
    type: 'text',
    nullable: true,
  })
  numberAccount?: string;

  @Column({
    name: 'number_target',
    type: 'text',
    nullable: true,
  })
  numberTarget?: string;

  @DeleteDateColumn({
    name: 'delete_at',
  })
  deleteAt?: Date;

  @ManyToOne(() => User, (user) => user.accounts)
  @JoinColumn({ name: 'user_id' })
  userId: User;

  @ManyToOne(() => AccountType, (accountType) => accountType.accounts)
  @JoinColumn({ name: 'account_type_id' })
  accountTypeId: AccountType;
}
