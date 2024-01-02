import { ConflictException, Injectable, Logger } from '@nestjs/common'
import { User } from '../user/schema/user.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UserService {
  private readonly SALT_ROUNDS = 10
  private readonly logger = new Logger()
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async findUserByEmail(email: string, fetchPassword?: boolean): Promise<User> {
    const projection = fetchPassword ? {} : { password: 0 }

    return this.userModel.findOne({ email }, projection).exec()
  }

  async registerUser(createUserDto: CreateUserDto) {
    const user = await this.findUserByEmail(createUserDto.email)
    if (user) {
      this.logger.error('User exists')
      throw new ConflictException('User with this email already exists. Please login using that email.')
    }

    const createUser = new this.userModel(createUserDto)
    createUser.password = await bcrypt.hash(createUserDto.password, this.SALT_ROUNDS)

    const savedUser = await createUser.save()
    const userObject = savedUser.toObject()
    delete userObject.password

    const payload = { email: savedUser.email, sub: savedUser._id }
    const accessToken = this.jwtService.sign(payload)

    return { ...userObject, access_token: accessToken }
  }
}
