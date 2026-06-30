import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { VersionController } from './version/version.controller';
import { VersionService } from './version/version.service';
import { PaymentsModule } from './payments/payments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.production', '.env'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI') || 'mongodb://127.0.0.1:27017/dhobimatrimony',
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    ProfilesModule,
    ChatModule,
    PaymentsModule,
    NotificationsModule,
  ],
  controllers: [AppController, VersionController],
  providers: [AppService, VersionService],
})
export class AppModule {}
