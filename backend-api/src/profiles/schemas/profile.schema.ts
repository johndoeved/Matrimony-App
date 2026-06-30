import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema({ _id: false })
class Location {
  @Prop() country: string;
  @Prop() state: string;
  @Prop() city: string;
}

@Schema({ _id: false })
class ProfessionalDetails {
  @Prop() education: string;
  @Prop() employmentType: string;
  @Prop() occupation: string;
  @Prop() currency: string;
  @Prop() incomeRange: string;
}

@Schema({ timestamps: true })
export class Profile {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop() gender: string;
  @Prop() dateOfBirth: Date;
  @Prop() height: string;
  @Prop() physicalStatus: string;
  @Prop() maritalStatus: string;

  @Prop() religion: string;
  @Prop() caste: string;
  @Prop() subcaste: string;
  @Prop() openToOtherSubcastes: boolean;
  @Prop() gothra: string;
  @Prop() haveDosh: string;

  @Prop({ type: Location })
  location: Location;

  @Prop({ type: ProfessionalDetails })
  professional: ProfessionalDetails;

  @Prop() familyStatus: string;
  @Prop() bio: string;

  @Prop([String])
  photos: string[];

  @Prop() idDocumentUrl: string;
  @Prop() selfieUrl: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
