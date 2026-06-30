import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  Post,
  Query,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  createProfile(@Body() profileData: any) {
    return this.profilesService.createProfile(profileData);
  }

  @Get('pending')
  getPendingProfiles() {
    return this.profilesService.findPending();
  }

  @Get('matches')
  getMatches(
    @Query('caste') caste?: string,
    @Query('religion') religion?: string,
    @Query('minAge') minAge?: string,
    @Query('maxAge') maxAge?: string,
  ) {
    return this.profilesService.findMatches({
      caste,
      religion,
      minAge,
      maxAge,
    });
  }

  @Get('stats')
  async getDashboardStats() {
    // Return analytical stats for the Web Admin Portal
    const pending = await this.profilesService.findPending();
    const approved = await this.profilesService.findMatches();

    return {
      totalUsers: pending.length + approved.length,
      pendingApprovals: pending.length,
      approvedProfiles: approved.length,
      premiumRevenue: approved.length * 999 + 2499, // Mock analytical data
    };
  }

  // 3. Super Admin Route: Download Profiles as CSV
  @Get('export')
  async exportProfiles() {
    // In a real app, verify Super Admin JWT claim here.
    const matches = await this.profilesService.findMatches(); // get all approved

    // Convert JSON to mock CSV format
    let csv = 'User ID,Gender,Religion,City\n';
    matches.forEach((p: any) => {
      const city = p.location?.city || 'Unknown';
      csv += `${p.user?._id},${p.gender},${p.religion},${city}\n`;
    });
    return csv;
  }

  @Patch(':id/approve')
  approveProfile(@Param('id') id: string) {
    return this.profilesService.updateStatus(id, 'approved');
  }

  @Patch(':id/reject')
  rejectProfile(@Param('id') id: string) {
    return this.profilesService.updateStatus(id, 'rejected');
  }
}
