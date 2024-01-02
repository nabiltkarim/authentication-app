import { Injectable } from '@nestjs/common'
import { User } from '../user/schema/user.schema'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { SigninResp } from './types'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findUserByEmail(email, true)
    if (user && (await bcrypt.compare(password, user.password))) {
      return user
    }

    return null
  }

  async signin(user: User): Promise<SigninResp> {
    const payload = { email: user.email, sub: user._id }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
