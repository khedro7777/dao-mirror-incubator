
// This is a simplified API service that would be used to connect to Supabase and Payload CMS
// In a real implementation, this would be expanded with proper auth and error handling

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client - these would be replaced with actual environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const payloadCmsUrl = import.meta.env.VITE_PAYLOAD_CMS_URL || 'http://localhost:3000';

// Create Supabase client only if URL is available
export const supabase = supabaseUrl 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// User authentication and management
export const auth = {
  signIn: async (email: string) => {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please provide VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
      }
      
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/verify`,
        },
      });
      
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error sending OTP:', error);
      return { success: false, error };
    }
  },
  
  verifyOtp: async (email: string, token: string) => {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please provide VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
      }
      
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email',
      });
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return { success: false, error };
    }
  },
  
  signOut: async () => {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please provide VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
      }
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error signing out:', error);
      return { success: false, error };
    }
  },
  
  getCurrentUser: async () => {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please provide VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
      }
      
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error getting current user:', error);
      return { success: false, error };
    }
  },
};

// API for Payload CMS data
export const api = {
  // Contracts
  getContracts: async () => {
    try {
      const response = await fetch(`${payloadCmsUrl}/api/contracts`);
      const data = await response.json();
      return { success: true, data: data.docs };
    } catch (error) {
      console.error('Error fetching contracts:', error);
      return { success: false, error };
    }
  },
  
  getContract: async (id: string) => {
    try {
      const response = await fetch(`${payloadCmsUrl}/api/contracts/${id}`);
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error(`Error fetching contract ${id}:`, error);
      return { success: false, error };
    }
  },
  
  createContract: async (contractData: any) => {
    try {
      const response = await fetch(`${payloadCmsUrl}/api/contracts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contractData),
      });
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error creating contract:', error);
      return { success: false, error };
    }
  },
  
  // User Profile and KYC
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
  
  // Voting
  submitVote: async (voteData: any) => {
    try {
      const response = await fetch(`${payloadCmsUrl}/api/votes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(voteData),
      });
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error submitting vote:', error);
      return { success: false, error };
    }
  },
  
  // Notifications
  getNotifications: async (userId: string) => {
    try {
      const response = await fetch(`${payloadCmsUrl}/api/notifications?where[user][equals]=${userId}`);
      const data = await response.json();
      return { success: true, data: data.docs };
    } catch (error) {
      console.error(`Error fetching notifications for user ${userId}:`, error);
      return { success: false, error };
    }
  },
  
  markNotificationAsRead: async (notificationId: string) => {
    try {
      const response = await fetch(`${payloadCmsUrl}/api/notifications/${notificationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isRead: true }),
      });
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error(`Error marking notification ${notificationId} as read:`, error);
      return { success: false, error };
    }
  },
};
