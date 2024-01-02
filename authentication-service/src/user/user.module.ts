import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './schema/user.schema'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt_secret'),
        signOptions: {
          expiresIn: '2d',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
