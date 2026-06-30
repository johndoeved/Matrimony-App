import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesService } from './profiles.service';
import { getModelToken } from '@nestjs/mongoose';
import { BadRequestException } from '@nestjs/common';

describe('ProfilesService', () => {
  let service: ProfilesService;
  let mockUserModel: any;

  beforeEach(async () => {
    mockUserModel = {
      findByIdAndUpdate: jest.fn().mockResolvedValue({ _id: 'user123', accountStatus: 'approved' }),
      find: jest.fn().mockReturnValue({ populate: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue([]) }) }),
    };

    // Need a mock class for the new Profile Model injection
    class MockProfileModel {
      constructor(private data: any) {}
      save = jest.fn().mockResolvedValue(this.data);
      static find = jest.fn().mockReturnValue({ populate: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue([]) }) });
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfilesService,
        { provide: getModelToken('Profile'), useValue: MockProfileModel },
        { provide: getModelToken('User'), useValue: mockUserModel },
      ],
    }).compile();

    service = module.get<ProfilesService>(ProfilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should enforce age restrictions for women (< 18)', async () => {
    const invalidProfileData = {
      gender: 'female',
      dateOfBirth: new Date(new Date().getFullYear() - 17, 1, 1).toISOString(),
    };

    await expect(service.createProfile(invalidProfileData)).rejects.toThrow(BadRequestException);
  });

  it('should enforce age restrictions for men (< 21)', async () => {
    const invalidProfileData = {
      gender: 'male',
      dateOfBirth: new Date(new Date().getFullYear() - 20, 1, 1).toISOString(),
    };

    await expect(service.createProfile(invalidProfileData)).rejects.toThrow(BadRequestException);
  });

  it('should update user account status in state machine', async () => {
    const res = await service.updateStatus('user123', 'approved');
    expect(res?.accountStatus).toBe('approved');
    expect(mockUserModel.findByIdAndUpdate).toHaveBeenCalledWith('user123', { accountStatus: 'approved' }, { new: true });
  });
});
