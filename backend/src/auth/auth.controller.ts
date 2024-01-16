import {
  Body,
  Request,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { Roles } from './roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @Roles(['client'])
  async validate(@Request() req: any) {
    return {
      user: req.user,
    };
  }

  @Post('signup')
  @UseInterceptors(NoFilesInterceptor())
  async signup(
    @Body()
    body: {
      email: 'string';
      password: 'string';
      name: 'string';
      phone: 'string';
    },
  ) {
    const { email, password, name, phone } = body;
    return this.authService.signup(email, password, name, phone);
  }
  @Post('signin')
  @UseInterceptors(NoFilesInterceptor())
  async signin(
    @Body()
    body: {
      email: 'string';
      password: 'string';
    },
  ) {
    return this.authService.signin(body.email, body.password);
  }
}
