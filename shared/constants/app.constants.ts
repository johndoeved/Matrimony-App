export const APP_CONSTANTS = {
  // Matching algorithm limits
  DAILY_SWIPE_LIMIT_FREE: 20,
  DAILY_SWIPE_LIMIT_PREMIUM: 9999, // Unlimited

  // Pricing
  PREMIUM_SUBSCRIPTION_PRICE_INR: 999,
  PREMIUM_SUBSCRIPTION_DURATION_DAYS: 30,

  // Socket Events
  SOCKET_EVENTS: {
    NEW_MESSAGE: 'newMessage',
    USER_ONLINE: 'userOnline',
    USER_OFFLINE: 'userOffline',
  },

  // Storage
  MAX_PROFILE_IMAGES: 6,
  MAX_IMAGE_SIZE_MB: 5,
};
