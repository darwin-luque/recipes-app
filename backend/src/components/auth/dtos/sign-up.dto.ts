import { IsEmail, Matches, MinLength } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)
  password: string;

  @MinLength(3)
  username: string;

  @MinLength(3)
  firstName: string;

  @MinLength(3)
  lastName: string;
}
