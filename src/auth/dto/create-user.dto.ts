import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty({
        description: 'Email of the user',
        example: 'newuser@example.com',
    })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Password for the user account',
        minLength: 6,
        maxLength: 50,
        pattern: '(?:(?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*',
        example: 'Password123!',
    })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

    @ApiProperty({
        description: 'Full name of the user',
        example: 'John Doe',
    })
    @IsString()
    @MinLength(1)
    fullname: string;

}
