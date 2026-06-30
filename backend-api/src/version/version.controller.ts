import { Controller, Get } from '@nestjs/common';

@Controller('version')
export class VersionController {
  @Get()
  getAppVersion() {
    return {
      latestVersion: '1.0.1', // The mobile app is hardcoded to 1.0.0, so this triggers the update prompt
      minVersion: '1.0.0',
      updateUrl: 'https://dhobimatrimony.com/download/app-v1.0.1.apk',
      forceUpdate: false,
      releaseNotes: '🚀 Added new Real-time Chat features!\n✨ Improved Matchmaking Algorithm.\n🐞 Bug fixes for older devices.'
    };
  }
}
