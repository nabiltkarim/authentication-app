import { Controller, Get, Post, UseGuards, Request, UsePipes, Body, Req } from '@nestjs/common'
import { AppService } from './app.service'
import { AuthService } from './auth/auth.service'
import { LocalAuthGuard } from './auth/local-auth.guard'
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { UserService } from './user/user.service'
import { RouteValidationPipe } from './route-validation'
import { CreateUserDto } from './user/dto/create-user.dto'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UsePipes(new RouteValidationPipe())
  @Get()
  getHealthCheck(): { message: string } {
    return this.appService.getHealthCheck()
  }

  @UseGuards(LocalAuthGuard)
  @UsePipes(new RouteValidationPipe())
  @Post('auth/signin')
  async signin(@Request() req) {
    return this.authService.signin(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new RouteValidationPipe())
  @Get('user')
  getUser(@Req() req) {
    const email = req.user.email
    return this.userService.findUserByEmail(email)
  }

  @UsePipes(new RouteValidationPipe())
  @Post('user/signup')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.registerUser(createUserDto)
  }
}
