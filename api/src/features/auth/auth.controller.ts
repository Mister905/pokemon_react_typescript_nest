import { 
  Controller, 
  Post, 
  Body, 
  UnauthorizedException, 
  BadRequestException,
  HttpCode,
  HttpStatus 
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    try {
      return await this.authService.register(registerDto);
    } catch (error) {
      if (error instanceof Error && error.message.includes('already exists')) {
        throw new BadRequestException('Username already exists');
      }
      throw new BadRequestException('Registration failed');
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    try {
      const user = await this.authService.validateUser(
        loginDto.username,
        loginDto.password,
      );
      
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      
      return await this.authService.login(user);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Login failed');
    }
  }
}
