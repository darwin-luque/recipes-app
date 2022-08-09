import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import {
  CaslAbilityFactory,
  AppAbility,
} from '../../components/casl/casl-ability.factory';
import {
  PolicyHandler,
  CHECK_POLICIES_KEY,
} from '../decorators/set-policies.decorator';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const { headers } = context.switchToHttp().getRequest() as Request;
    const token = headers['authorization']?.replace('Bearer ', '');
    const payload = this.jwtService.decode(token ?? '');

    if (!payload) {
      return false;
    }
    const ability = this.caslAbilityFactory.createForUser(
      payload as TokenPayload,
    );

    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability),
    );
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
