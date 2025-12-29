import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { AccountType } from './entities/account-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account, AccountType])],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [TypeOrmModule],
})
export class AccountsModule {}
