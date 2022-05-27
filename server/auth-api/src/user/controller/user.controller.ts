import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { SerializePaginated } from 'src/shared/interceptors/serialize-paginated.interceptor';
import { Serialize } from 'src/shared/interceptors/serialize.interceptor';
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
  @Post('create')
  createUser(@Body() createDto: CreateDto): Promise<User> {
    const createInstace = this.userHelper.signupDtoToInstance(createDto);
    return this.userService.createUser(createInstace);
  }

  // get all users paginated
  @SerializePaginated(UserSerializeDto)
  @Get('all')
  async getAllUsers(
    @Query('page', new DefaultValuePipe(1),ParseIntPipe) page,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit
  ): Promise<Pagination<User>>{
    limit = limit>50? 50:limit;
    return this.userService.getAllUsers({
      limit:limit,
      page,
      route:`http://localhost:3000/user/all`
    })
  }

  //get single user by id
  @Serialize(UserSerializeDto)
  @Get(':id')
  async getSingleUser(@Param('id') Id): Promise<User>{
    return this.userService.getUserById(Id)
  }


  // update user name
  @Put('update/:id')
  async updateUserName(@Body()updateDto:UpdateDto, @Param('id') id):Promise<User>{
    const updateInstace = this.userHelper.updateDtoToInstace(updateDto)
    return this.userService.updateUserName(id, updateInstace)
  }
}
