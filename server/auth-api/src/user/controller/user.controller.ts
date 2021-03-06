import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/model/decorators/roles.decorator';
import { RolesEnum } from 'src/shared/enums/roles.enum';
import { SerializePaginated } from 'src/shared/interceptors/serialize-paginated.interceptor';
import { Serialize } from 'src/shared/interceptors/serialize.interceptor';
import { DeleteResult } from 'typeorm';
import { serialize } from 'v8';
import { changePasswordDto } from '../model/dtos/changePassword.dto';
import { DeleteAccountDto } from '../model/dtos/delete-account.dto';
import { LoginDto } from '../model/dtos/login.dto';
import { UserSerializeDto } from '../model/dtos/serialize-dtos/user-serialize.dto';
import { CreateDto } from '../model/dtos/signup.dto';
import { UpdateDto } from '../model/dtos/update.dto';
import { ValidateEmailDto } from '../model/dtos/validate-email.dto';

import { User } from '../model/entities/user.entity';
import { UserHelperService } from '../services/user-helper/user-helper.service';
import { UserService } from '../services/user-service/user.service';

/** the user controller contains all routes */
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userHelper: UserHelperService,
    @Inject('auth_serv') private readonly client: ClientProxy,
  ) {}
  /**create new user */
  @Post('create')
  async createUser(@Body() createDto: CreateDto): Promise<{ token: string }> {
    const createInstace = this.userHelper.signupDtoToInstance(createDto);
    const result = await this.userService.createUser(createInstace);
    this.client.emit('newUser', result.user);
    return { token: result.token };
  }

  /**get all users paginated */
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

  /**get single user by id */
  @Serialize(UserSerializeDto)
  @Get('one/:id')
  async getSingleUser(@Param('id') Id): Promise<User> {
    return this.userService.getUserById(Id);
  }

  /**update user name */
  @Put('update/:id')
  async updateUserName(
    @Body() updateDto: UpdateDto,
    @Param('id') id,
  ): Promise<User> {
    const updateInstace = this.userHelper.updateDtoToInstace(updateDto);
    return this.userService.updateUserName(id, updateInstace);
  }

  /**login user */
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    const loginInstance = this.userHelper.loginDtoToInstance(loginDto);
    return this.userService.login(loginInstance);
  }

  /**update user password */
  @Serialize(UserSerializeDto)
  @UseGuards(JwtGuard)
  @Put('change-password')
  async changePassword(
    @Body() changeDto: changePasswordDto,
    @Req() req: any,
  ): Promise<User> {
    const changePassInstance =
      this.userHelper.changePassDtoToInstance(changeDto);
    return this.userService.changePassword(req.user.userId, changePassInstance);
  }

  /**change email */
  @Serialize(UserSerializeDto)
  @UseGuards(JwtGuard)
  @Put('change-email')
  async changeEmail(@Body() Body: LoginDto, @Req() req: any): Promise<User> {
    let changeEmailInstance = this.userHelper.loginDtoToInstance(Body);
    return this.userService.changeEmail(req.user.userId, changeEmailInstance);
  }

  /**delete account */
  @Serialize(UserSerializeDto)
  @UseGuards(JwtGuard)
  @Delete('delete')
  async deleteAccount(
    @Body() Body: DeleteAccountDto,
    @Req() req: any,
  ): Promise<DeleteResult> {
    let deleteAccountInstance =
      this.userHelper.deleteAccountDtoToInstance(Body);
    return this.userService.deleteAccount(
      req.user.userId,
      deleteAccountInstance,
    );
  }
  /**validate user email */
  @Post('validate-email')
  async validateEmail(
    @Body() validateDto: ValidateEmailDto,
  ): Promise<{ token: string }> {
    const validateInstance = this.userHelper.validateDtoToInstance(validateDto);
    return this.userService.validateEmail(validateInstance);
  }

  /**resend validation email */
  @UseGuards(JwtGuard)
  @Get('resend-validation')
  async resendValidtion(@Req() req: any): Promise<boolean> {
    return this.userService.resendValidation(req.user.Id);
  }

  @Serialize(UserSerializeDto)
  @Get('find-by-email')
  async findByUserName(@Query('email') email: string) {
    return this.userService.findAllByEmail(email);
  }
}
