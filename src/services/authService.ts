
import { checkSupabaseConfig, supabase } from './config';

// User authentication and management
export const auth = {
  signIn: async (email: string) => {
    try {
      checkSupabaseConfig();
      
      const { error } = await supabase!.auth.signInWithOtp({
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
      checkSupabaseConfig();
      
      const { data, error } = await supabase!.auth.verifyOtp({
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
      checkSupabaseConfig();
      
      const { error } = await supabase!.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error signing out:', error);
      return { success: false, error };
    }
  },
  
  getCurrentUser: async () => {
    try {
      checkSupabaseConfig();
      
      const { data, error } = await supabase!.auth.getUser();
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error getting current user:', error);
      return { success: false, error };
    }
  },
};
