
import React, { createContext, useState, useEffect, useContext } from "react";
import { auth, users } from "@/services";

interface User {
  id: string;
  email: string;
  fullName?: string;
  roles?: string[];
  kycStatus?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string) => Promise<{ success: boolean; error?: any }>;
  verifyOtp: (email: string, token: string) => Promise<{ success: boolean; error?: any }>;
  signOut: () => Promise<{ success: boolean; error?: any }>;
  updateUserProfile: (userData: Partial<User>) => Promise<{ success: boolean; error?: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for user session on mount
    const checkAuth = async () => {
      try {
        setLoading(true);
        const { success, data, error } = await auth.getCurrentUser();
        
        if (success && data.user) {
          // Fetch additional user profile data from Payload CMS
          const userProfile = await users.getUserProfile(data.user.id);
          
          if (userProfile.success) {
            setUser({
              id: data.user.id,
              email: data.user.email || '',
              fullName: userProfile.data.fullName,
              roles: userProfile.data.roles,
              kycStatus: userProfile.data.kycStatus,
            });
          } else {
            setUser({
              id: data.user.id,
              email: data.user.email || '',
            });
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Auth check error:', err);
        setError('Failed to check authentication status');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signIn = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      return await auth.signIn(email);
    } catch (err) {
      setError('Sign in failed');
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (email: string, token: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await auth.verifyOtp(email, token);
      
      if (result.success && result.data.user) {
        // Fetch additional user profile data from Payload CMS
        const userProfile = await users.getUserProfile(result.data.user.id);
        
        if (userProfile.success) {
          setUser({
            id: result.data.user.id,
            email: result.data.user.email || '',
            fullName: userProfile.data.fullName,
            roles: userProfile.data.roles,
            kycStatus: userProfile.data.kycStatus,
          });
        } else {
          setUser({
            id: result.data.user.id,
            email: result.data.user.email || '',
          });
        }
      }
      
      return result;
    } catch (err) {
      setError('OTP verification failed');
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await auth.signOut();
      
      if (result.success) {
        setUser(null);
      }
      
      return result;
    } catch (err) {
      setError('Sign out failed');
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (userData: Partial<User>) => {
    try {
      if (!user || !user.id) {
        throw new Error('No authenticated user');
      }
      
      setLoading(true);
      setError(null);
      const result = await users.updateUserProfile(user.id, userData);
      
      if (result.success) {
        setUser((prevUser) => prevUser ? { ...prevUser, ...userData } : null);
      }
      
      return result;
    } catch (err) {
      setError('Profile update failed');
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, signIn, verifyOtp, signOut, updateUserProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
