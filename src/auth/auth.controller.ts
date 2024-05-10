import { Controller, Post, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully', type: User })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'Conflict. User already exists' })
  @ApiBody({
    description: 'Create User DTO',
    type: CreateUserDto,
    examples: {
        example1: {
            summary: 'User example',
            description: 'An example of a user registration request',
            value: {
                email: 'newuser@haciendola.com',
                password: 'Password123',
                fullname: 'New User',
            },
        }
    },
  })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Log in an existing user' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid credentials' })
  @ApiBody({
    description: 'Login User DTO',
    type: LoginUserDto,
    examples: {
        example2: {
            summary: 'Login example',
            description: 'An example of a user login request',
            value: {
                email: 'existinguser@haciendola.com',
                password: 'Password123',
            },
        }
    },
  })
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

}
