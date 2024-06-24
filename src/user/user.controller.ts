import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const medicalRecord = await this.userService.findOne(id);
    if (!medicalRecord) {
      throw new NotFoundException('Medical record not found');
    }
    return medicalRecord;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updateddUser = await this.userService.update(id, updateUserDto);
    if (!updateddUser) {
      throw new NotFoundException('Medical record not found');
    }
    return updateddUser;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.userService.remove(id);
    if (!deleted) {
      throw new NotFoundException('Medical record not found');
    }
    return;
  }
}
