import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CreateAccountTypeDto } from './dto/create-account-type.dto';
import { AccountTypeService } from './accounts-type.service';

@Controller('account-type')
export class AccountTypeController {
  constructor(private readonly accountTypeService: AccountTypeService) {}

  @Auth()
  @Post()
  @ApiResponse({
    status: 201,
    description: 'The account type has been successfully created.',
    type: CreateAccountTypeDto,
  })
  public createTypeAccount(@Body() createAccountTypeDto: CreateAccountTypeDto) {
    return this.accountTypeService.createTypeAccount(createAccountTypeDto);
  }

  @Auth()
  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of account types retrieved successfully.',
    type: [CreateAccountTypeDto],
  })
  public getAccountTypes() {
    return this.accountTypeService.getAccountTypes();
  }
}
