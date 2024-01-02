import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose'
import { Document, HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  email: string

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  password: string
}

export const UserSchema = SchemaFactory.createForClass(User)
