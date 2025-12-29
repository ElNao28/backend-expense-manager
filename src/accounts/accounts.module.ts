import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { AccountType } from './entities/account-type.entity';
import { AuthModule } from '../auth/auth.module';
import { AccountTypeController } from './accounts-type.controller';
import { AccountTypeService } from './accounts-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account, AccountType]), AuthModule],
  controllers: [AccountsController, AccountTypeController],
  providers: [AccountsService, AccountTypeService],
  exports: [TypeOrmModule],
})
export class AccountsModule {}
