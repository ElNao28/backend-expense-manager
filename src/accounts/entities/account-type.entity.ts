import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './account.entity';

@Entity({
  name: 'account_type',
})
export class AccountType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
  })
  name: string;

  @DeleteDateColumn({
    name: 'delete_at',
  })
  deleteAt?: Date;

  @OneToMany(() => Account, (account) => account.accountTypeId)
  accounts: Account[];
}
