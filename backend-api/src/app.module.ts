import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';

let mongod: MongoMemoryServer;
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
      useFactory: async (configService: ConfigService) => {
        const configuredUri = configService.get<string>('MONGODB_URI');
        const localUri =
          configService.get<string>('LOCAL_MONGODB_URI') ||
          'mongodb://127.0.0.1:27017/dhobi_matrimony';

        if (configuredUri) {
          try {
            const probeClient = new MongoClient(configuredUri, {
              serverSelectionTimeoutMS: 3000,
            });
            await probeClient.connect();
            await probeClient.close();
            console.log(`[Database] Using configured MongoDB URI`);
            return { uri: configuredUri };
          } catch (error) {
            console.warn(
              `[Database] Configured MongoDB URI is unavailable, falling back to a local database.`,
            );
          }
        }

        try {
          const localProbeClient = new MongoClient(localUri, {
            serverSelectionTimeoutMS: 3000,
          });
          await localProbeClient.connect();
          await localProbeClient.close();
          console.log(`[Database] Using local MongoDB URI`);
          return { uri: localUri };
        } catch (error) {
          console.warn(
            `[Database] Local MongoDB URI is unavailable, falling back to an in-memory database.`,
          );
        }

        try {
          if (!mongod) {
            mongod = await MongoMemoryServer.create();
          }
          const uri = mongod.getUri();
          console.log(`[Database] Using In-Memory MongoDB: ${uri}`);
          return { uri };
        } catch (error) {
          console.error("Failed to start in-memory db", error);
          return { uri: 'mongodb://127.0.0.1:27017/dhobimatrimony' };
        }
      },
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
