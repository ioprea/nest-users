import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '../decorators';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(new AuthGuard('VIEW'))
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  @UseGuards(new AuthGuard('CREATE'))
  @ApiBody({ type: CreateUserDto })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  @UseGuards(new AuthGuard('EDIT'))
  update(@Param('id') id: string, @Body() updatedUser: any) {
    return this.usersService.update(id, updatedUser);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard('DELETE'))
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }

  @Get('managed/:id')
  @UseGuards(new AuthGuard('VIEW'))
  getManagedUsers(@Param('id') id: string) {
    const managedUsers = this.usersService.getManagedUsers(id);

    if (!managedUsers.length) {
      return [];
    }

    return managedUsers;
  }
}
