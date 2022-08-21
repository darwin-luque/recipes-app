import { SignInHandler } from './sign-in';
import { SignUpHandler } from './sign-up';
import { UpdateUserByIdHandler } from './update-user-by-id';

export const CommandHandlers = [
  SignUpHandler,
  SignInHandler,
  UpdateUserByIdHandler,
];
