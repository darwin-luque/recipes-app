import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class SetUserMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async use(req: ExpressRequest, res: Response, next: (error?: any) => void) {
    const { authorization } = req.headers;

    const token = authorization?.replace('Bearer ', '');

    if (token) {
      const payload = this.jwtService.decode(token) as TokenPayload | null;

      if (payload) {
        req.user = await this.userRepository.findOneBy({ id: payload.sub });
      }
    }

    next();
  }
}
