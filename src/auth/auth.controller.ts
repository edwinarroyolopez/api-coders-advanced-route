import { Controller, Post, Get, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() userDto: any) {
    return this.authService.signup(userDto);
  }

  @Post('login')
  async login(@Body() credentials: any) {
    return this.authService.login(credentials);
  }

  @UseGuards(JwtAuthGuard)
  @Get('posts')
  async getPosts() {
    // Aquí iría la lógica para obtener los posts.
    return { message: 'Aquí se retornarán los posts protegidos' };
  }
}
