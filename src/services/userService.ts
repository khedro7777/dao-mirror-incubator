
import { payloadCmsUrl } from './config';

export const userService = {
  getUserProfile: async (userId: string) => {
    try {
      const response = await fetch(`${payloadCmsUrl}/api/users/${userId}`);
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error(`Error fetching user profile ${userId}:`, error);
      return { success: false, error };
    }
  },
  
  updateUserProfile: async (userId: string, userData: any) => {
    try {
      const response = await fetch(`${payloadCmsUrl}/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error(`Error updating user profile ${userId}:`, error);
      return { success: false, error };
    }
  },
  
  submitKyc: async (kycData: any) => {
    try {
      const response = await fetch(`${payloadCmsUrl}/api/kyc-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(kycData),
      });
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error submitting KYC:', error);
      return { success: false, error };
    }
  },
};
