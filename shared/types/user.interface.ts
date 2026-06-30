export interface User {
  _id: string;
  phone: string;
  name: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  caste: string;
  isVerified: boolean;
  isPremium: boolean;
  profileImages: string[];
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Match {
  _id: string;
  users: string[]; // User IDs
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}
