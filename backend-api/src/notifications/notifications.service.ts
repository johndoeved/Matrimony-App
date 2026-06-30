import { Injectable } from '@nestjs/common';
import { getApps, initializeApp } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';

@Injectable()
export class NotificationsService {
  private initialized = false;

  constructor() {
    try {
      if (!getApps().length) {
        // initializeApp({ credential: admin.credential.cert('./serviceAccountKey.json') });
        this.initialized = false;
      } else {
        this.initialized = true;
      }
    } catch (e) {
      console.warn(
        'Firebase Admin SDK not initialized. Please add serviceAccountKey.json.',
      );
    }
  }

  async sendPushNotification(
    fcmToken: string,
    title: string,
    body: string,
    data?: any,
  ) {
    if (!this.initialized) {
      console.log(
        `[Mock Push Notification] To: ${fcmToken} | Title: ${title} | Body: ${body}`,
      );
      return;
    }

    try {
      const response = await getMessaging().send({
        token: fcmToken,
        notification: {
          title,
          body,
        },
        data: data || {},
      });
      console.log('Successfully sent push notification:', response);
    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  }
}
