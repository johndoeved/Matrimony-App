import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import axios from 'axios';

@Injectable()
export class AuthService {
  private otpStore = new Map<string, string>(); // In-memory store for MVP

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async generateOtp(emailOrPhone: string): Promise<{ message: string }> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    this.otpStore.set(emailOrPhone, otp);

    if (emailOrPhone.includes('@')) {
      // Send Email via Nodemailer
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: `"Dhobi Matrimony" <${process.env.SMTP_EMAIL}>`,
        to: emailOrPhone,
        subject: 'Your Verification Code',
        text: `Your verification code is ${otp}`,
      });
      return { message: 'OTP sent via Email' };
    } else {
      // Route via WhatsApp if requested (Checks for + prefix or just uses Twilio fallback)
      if (process.env.TWILIO_WHATSAPP_NUMBER && process.env.TWILIO_ACCOUNT_SID) {
        const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`;
        const authHeader = 'Basic ' + Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64');
        
        try {
          await axios.post(
            twilioUrl,
            new URLSearchParams({
              To: `whatsapp:${emailOrPhone.startsWith('+') ? emailOrPhone : '+91' + emailOrPhone}`,
              From: process.env.TWILIO_WHATSAPP_NUMBER,
              Body: `Your Dhobi Matrimony verification code is ${otp}. Please do not share this with anyone.`,
            }),
            { headers: { Authorization: authHeader, 'Content-Type': 'application/x-www-form-urlencoded' } }
          );
          return { message: 'OTP sent via WhatsApp' };
        } catch (e) {
          console.error('WhatsApp failed, falling back to SMS...');
        }
      }

      // Fallback: Send SMS via Fast2SMS
      if (process.env.FAST2SMS_API_KEY) {
        await axios.get('https://www.fast2sms.com/dev/bulkV2', {
          params: {
            authorization: process.env.FAST2SMS_API_KEY,
            route: 'q',
            message: `Your Dhobi Matrimony verification code is ${otp}`,
            language: 'english',
            flash: 0,
            numbers: emailOrPhone,
          }
        });
        return { message: 'OTP sent via SMS' };
      } else {
        return { message: 'OTP generated (Mock Mode)' };
      }
    }
  }

  async verifyOtp(emailOrPhone: string, otp: string) {
    const storedOtp = this.otpStore.get(emailOrPhone);
    if (!storedOtp || storedOtp !== otp) {
      throw new UnauthorizedException('Invalid or expired OTP');
    }
    this.otpStore.delete(emailOrPhone); // Clear OTP after success
    return { success: true };
  }

  async validateUser(emailOrPhone: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmailOrPhone(emailOrPhone);
    if (user && user.passwordHash && await bcrypt.compare(pass, user.passwordHash)) {
      const { passwordHash, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { emailOrPhone: user.emailOrPhone, sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user
    };
  }

  async register(data: any) {
    const existing = await this.usersService.findByEmailOrPhone(data.emailOrPhone);
    if (existing) {
      throw new ConflictException('User already exists');
    }
    const passwordHash = await bcrypt.hash(data.password, 10);
    const newUser = await this.usersService.create({
      emailOrPhone: data.emailOrPhone,
      passwordHash,
      role: 'user',
      accountStatus: 'pending'
    });
    
    return this.login(newUser);
  }
}
