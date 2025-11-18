import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  firtsname: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  lastname: string;

  @Column({
    type: 'text',
    nullable: true,
    name: 'second_lastname',
  })
  secondLastname?: string;

  @Column({
    type: 'text',
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'int',
    nullable: false,
    unique: true,
  })
  phone: string;

  @Column({
    type: 'text',
    nullable: false,
    select: false,
  })
  password: string;

  @Column({
    type: 'bool',
    default: true,
  })
  isActive: boolean;

  @DeleteDateColumn()
  deleteAt?: Date;

  @BeforeInsert()
  hashPasswordBfInsert() {
    const hashPassword = bcrypt.hashSync(
      this.password,
      process.env.ROUNDS_HASH ? +process.env.ROUNDS_HASH : 8,
    );
    this.password = hashPassword;
  }

  @BeforeUpdate()
  hashPasswordBfUpdate() {
    if (!this.password) return;
    const hashPassword = bcrypt.hashSync(
      this.password,
      process.env.ROUNDS_HASH ? +process.env.ROUNDS_HASH : 8,
    );
    this.password = hashPassword;
  }
}
