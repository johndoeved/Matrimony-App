import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dns from 'dns';

// Fix Node 18+ IPv6 DNS resolution issues with MongoDB SRV on Windows
dns.setDefaultResultOrder('ipv4first');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with dynamic settings for production
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Seed Admin User
  const usersService = app.get(require('./users/users.service').UsersService);
  const bcrypt = require('bcrypt');
  const existingAdmin = await usersService.findByEmailOrPhone('admin@dhobi.com');
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('admin123', 10);
    await usersService.create({
      emailOrPhone: 'admin@dhobi.com',
      passwordHash,
      role: 'admin',
      accountStatus: 'approved',
      isVerified: true
    });
    console.log('Seeded default admin user: admin@dhobi.com / admin123');
  }

  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log(`Application is running on port: ${port}`);
}
bootstrap();
