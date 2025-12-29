import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ApiResponse } from '@nestjs/swagger';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Auth()
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Account successfully created.',
    type: CreateAccountDto,
  })
  public createAccount(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.createAccount(createAccountDto);
  }

  @Auth()
  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Account successfully updated.',
  })
  public updateAccount(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    return this.accountsService.updateAccount(id, updateAccountDto);
  }

  @Auth()
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Account successfully retrieved.',
    type: CreateAccountDto,
  })
  public getAccountById(@Param('id', ParseUUIDPipe) id: string) {
    return this.accountsService.getAccountById(id);
  }

  @Auth()
  @Get('by-user/:userId')
  @ApiResponse({
    status: 200,
    description: 'Accounts for user successfully retrieved.',
    type: [CreateAccountDto],
  })
  public getAccountsByUserId(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.accountsService.getAccountsByUserId(userId);
  }

  @Auth()
  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Account successfully deleted.'
  })
  public deleteAccount(@Param('id', ParseUUIDPipe) id: string) {
    return this.accountsService.deleteAccount(id);
  }
}
