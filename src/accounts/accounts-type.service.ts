import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HandlerDataBaseErrors } from 'src/common/helpers/handler-database-errors.helper';
import { Repository } from 'typeorm';
import { CreateAccountTypeDto } from './dto/create-account-type.dto';
import { AccountType } from './entities/account-type.entity';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountTypeService {
  constructor(
    @InjectRepository(AccountType)
    private readonly accountTypeRepository: Repository<AccountType>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  public async createTypeAccount(createAccountTypeDto: CreateAccountTypeDto) {
    try {
      const newAccountType =
        this.accountTypeRepository.create(createAccountTypeDto);
      return await this.accountTypeRepository.save(newAccountType);
    } catch (error) {
      HandlerDataBaseErrors(error);
    }
  }

  public async getAccountTypes() {
    try {
      return await this.accountTypeRepository.find();
    } catch (error) {
      HandlerDataBaseErrors(error);
    }
  }
}
