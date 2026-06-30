import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  emailOrPhone: string;

  @Prop()
  passwordHash?: string;

  @Prop()
  otp?: string;

  @Prop()
  otpExpiresAt?: Date;

  @Prop({ default: 'user', enum: ['user', 'admin', 'superadmin'] })
  role: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: 'pending', enum: ['pending', 'approved', 'rejected'] })
  accountStatus: string;

  @Prop({ type: Types.ObjectId, ref: 'Profile' })
  profileId?: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
