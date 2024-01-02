import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtPayload, JwtValidation } from './types'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt_secret'),
      userNameField: 'email',
    })
  }

  async validate(payload: JwtPayload): Promise<JwtValidation> {
    return { id: payload.sub, email: payload.email }
  }
}
