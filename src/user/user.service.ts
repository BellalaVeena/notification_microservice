import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import * as Bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { UserRoleUpdateDto } from './dto/user_role_update.dto';

dotenv.config();

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepo: Repository<User>,
    private jwtService: JwtService
  ) {}

  async create(userData: UserDto) {
    try {
      const user = await this._userRepo.findOne({
        where:{username:userData.username}
      })
      if(user){
        throw new BadRequestException('User is already present with given username')
      }
      const hashedPassword = await Bcrypt.hash(userData.password, 12);
      await this._userRepo.save({
        password: hashedPassword,
        username: userData.username,
      });
      return { message: 'User registration done!' };
    } catch (error) {
      throw error;
    }
  }

  async login(userData: UserDto): Promise<string> {
    try {
      const existingUser = await this._userRepo.findOne({
        where: {
          username: userData.username,
        },
      });
      if (!existingUser) {
        throw new NotFoundException('User not found');
      }
      const comparePassword = await Bcrypt.compare(
        userData.password,
        existingUser.password
      );
      if (comparePassword) {
        return this.generateAccessToken(existingUser);
      } else throw new BadRequestException('Invalid username or password');
    } catch (error) {
      throw error;
    }
  }

  async generateAccessToken(user: User): Promise<string> {
    return this.jwtService.sign(
      {
        id: user.id,
        role: user.role,
      },
      {
        secret: process.env.JWT_SECRET,
      }
    );
  }

  async updateUserRole(id: number, userRole: UserRoleUpdateDto) {
    try {
      const user = await this._userRepo.findOne({
        where: {
          id,
        },
      });
      if (!user) {
        throw new NotFoundException('User not found!');
      }
      await this._userRepo.update(id, {
        role: userRole.role,
      });
      return { message: 'User role updated successfully!' };
    } catch (error) {
      throw error;
    }
  }
}
