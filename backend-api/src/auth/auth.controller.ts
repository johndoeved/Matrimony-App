import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: any) {
    return this.authService.register(registerDto);
  }

  @Post('send-otp')
  async sendOtp(@Body() body: { emailOrPhone: string }) {
    return this.authService.generateOtp(body.emailOrPhone);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() body: { emailOrPhone: string; otp: string }) {
    return this.authService.verifyOtp(body.emailOrPhone, body.otp);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: Record<string, string>) {
    const user = await this.authService.validateUser(
      loginDto.emailOrPhone,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }
}
