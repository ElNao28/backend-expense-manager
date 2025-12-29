import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { AuthService } from '../auth/auth.service';
import { AccountType } from './entities/account-type.entity';
import { HandlerDataBaseErrors } from 'src/common/helpers/handler-database-errors.helper';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(AccountType)
    private readonly accountTypeRepository: Repository<AccountType>,
    private readonly authService: AuthService,
  ) {}

  public async createAccount(createAccountDto: CreateAccountDto) {
    const { accountTypeId, userId, ...newAccountDto } = createAccountDto;
    const foundUser = await this.authService.getUserById(userId);
    const accountType = await this.accountTypeRepository.findOneBy({
      id: accountTypeId,
    });

    if (!accountType) throw new NotFoundException('Account type not found');

    try {
      const newAccount = this.accountRepository.create({
        ...newAccountDto,
        userId: foundUser,
        accountTypeId: accountType,
      });

      return await this.accountRepository.save(newAccount);
    } catch (error) {
      HandlerDataBaseErrors(error);
    }
  }

  public async updateAccount(id: string, updateAccountDto: UpdateAccountDto) {
    const { accountTypeId, userId, ...updAccountDto } = updateAccountDto;
    const account = await this.accountRepository.preload({
      id,
      ...updAccountDto,
    });

    if (accountTypeId) {
      const accountType = await this.accountTypeRepository.findOneBy({
        id: accountTypeId,
      });
      if (!accountType) throw new NotFoundException('Account type not found');
      account!.accountTypeId = accountType;
    }
    try {
      return await this.accountRepository.update(id, account!);
    } catch (error) {
      HandlerDataBaseErrors(error);
    }
  }

  public async getAccountById(id: string) {
    const account = await this.accountRepository.findOneBy({ id });
    if (!account) throw new NotFoundException('Account not found');
    return account;
  }

  public async getAccountsByUserId(userId: string) {
    const user = await this.authService.getUserById(userId);

    try {
      return await this.accountRepository.find({
        where: {
          userId: user,
        },
      });
    } catch (error) {
      HandlerDataBaseErrors(error);
    }
  }

  public async deleteAccount(id: string) {
    const account = await this.getAccountById(id);
    try {
      return await this.accountRepository.softDelete(account.id);
    } catch (error) {
      HandlerDataBaseErrors(error);
    }
  }
}
