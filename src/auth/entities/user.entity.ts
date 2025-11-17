import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
    name:'second_lastname'
  })
  secondLastname?: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  email: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  phone: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  password: string;

}
