import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/model/decorators/roles.decorator';
import { RolesEnum } from 'src/shared/enums/roles.enum';
import { SerializePaginated } from 'src/shared/interceptors/serialize-paginated.interceptor';
import { Serialize } from 'src/shared/interceptors/serialize.interceptor';
import { LoginDto } from '../model/dtos/login.dto';
import { UserSerializeDto } from '../model/dtos/serialize-dtos/user-serialize.dto';
import { CreateDto } from '../model/dtos/signup.dto';
import { UpdateDto } from '../model/dtos/update.dto';

import { User } from '../model/entities/user.entity';
import { UserHelperService } from '../services/user-helper/user-helper.service';
import { UserService } from '../services/user-service/user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userHelper: UserHelperService,
  ) {}
  // create new user
  @Serialize(UserSerializeDto)
  @Post('create')
  createUser(@Body() createDto: CreateDto): Promise<User> {
    const createInstace = this.userHelper.signupDtoToInstance(createDto);
    return this.userService.createUser(createInstace);
  }

  // get all users paginated
  @Roles(RolesEnum.admin, RolesEnum.super)
  @SerializePaginated(UserSerializeDto)
  @UseGuards(JwtGuard, RoleGuard)
  @Get('all')
  async getAllUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit,
  ): Promise<Pagination<User>> {
    limit = limit > 50 ? 50 : limit;
    return this.userService.getAllUsers({
      limit: limit,
      page,
      route: `http://localhost:3000/user/all`,
    });
  }

  //get single user by id
  @Serialize(UserSerializeDto)
  @Get(':id')
  async getSingleUser(@Param('id') Id): Promise<User> {
    return this.userService.getUserById(Id);
  }

  // update user name
  @Put('update/:id')
  async updateUserName(
    @Body() updateDto: UpdateDto,
    @Param('id') id,
  ): Promise<User> {
    const updateInstace = this.userHelper.updateDtoToInstace(updateDto);
    return this.userService.updateUserName(id, updateInstace);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<string> {
    const loginInstance = this.userHelper.loginDtoToInstance(loginDto);
    return this.userService.login(loginInstance);
  }
}
