import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from './schemas/profile.schema';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createProfile(data: any): Promise<ProfileDocument> {
    // 1. Age Enforcement Rule: 18 for women, 21 for men
    if (data.dateOfBirth) {
      const dob = new Date(data.dateOfBirth);
      const diff = Date.now() - dob.getTime();
      const age = new Date(diff).getUTCFullYear() - 1970;

      const gender = (data.gender || '').toLowerCase();
      if (gender === 'female' && age < 18) {
        throw new BadRequestException('Minimum age for women is 18.');
      }
      if (gender === 'male' && age < 21) {
        throw new BadRequestException('Minimum age for men is 21.');
      }
    }

    const created = new this.profileModel(data);
    const saved = await created.save();
    await this.userModel.findByIdAndUpdate(data.user, { profileId: saved._id });
    return saved;
  }

  async findPending(): Promise<UserDocument[]> {
    return this.userModel
      .find({ accountStatus: 'pending' })
      .populate('profileId')
      .exec();
  }

  async updateStatus(
    userId: string,
    status: string,
  ): Promise<UserDocument | null> {
    return this.userModel
      .findByIdAndUpdate(userId, { accountStatus: status }, { new: true })
      .exec();
  }

  async findMatches(filters?: {
    caste?: string;
    religion?: string;
    minAge?: string;
    maxAge?: string;
  }): Promise<ProfileDocument[]> {
    const approvedUsers = await this.userModel
      .find({ accountStatus: 'approved' })
      .select('_id')
      .exec();
    const userIds = approvedUsers.map((u) => u._id);

    // 2. Matchmaking Algorithm: Filter by caste, religion, age
    const query: any = { user: { $in: userIds } };

    if (filters?.caste) {
      query.caste = new RegExp(filters.caste, 'i');
    }

    if (filters?.religion) {
      query.religion = new RegExp(filters.religion, 'i');
    }

    if (filters?.minAge || filters?.maxAge) {
      const minAge = parseInt(filters.minAge || '18', 10);
      const maxAge = parseInt(filters.maxAge || '100', 10);

      const maxDate = new Date();
      maxDate.setFullYear(maxDate.getFullYear() - minAge);

      const minDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - maxAge);

      query.dateOfBirth = { $gte: minDate, $lte: maxDate };
    }

    return this.profileModel
      .find(query)
      .populate('user', 'emailOrPhone isVerified accountStatus')
      .exec();
  }
}
