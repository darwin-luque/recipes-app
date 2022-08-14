import { IsEmail, IsString, Matches, ValidateIf } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @ValidateIf((o) => !o.username)
  email?: string;

  @IsString()
  @ValidateIf((o) => !o.email)
  username?: string;

  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)
  password: string;
}
