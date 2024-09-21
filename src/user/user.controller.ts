import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { UserRoleUpdateDto } from './dto/user_role_update.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post('/register')
  async create(@Body() userData: UserDto): Promise<{
    message: string;
  }> {
    return this._userService.create(userData);
  }

  @Post('/login')
  async login(@Body() userData: UserDto): Promise<string> {
    return this._userService.login(userData);
  }

  @Patch('/:id')
  async updateRole(
    @Param('id') id: number,
    @Body() userRole: UserRoleUpdateDto
  ): Promise<{
    message: string;
  }> {
    return this._userService.updateUserRole(id, userRole);
  }
}
