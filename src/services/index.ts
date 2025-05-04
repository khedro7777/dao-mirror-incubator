
import { supabase } from './config';
import { auth } from './authService';
import { contractService } from './contractService';
import { userService } from './userService';
import { votingService } from './votingService';
import { notificationService } from './notificationService';

// Re-export all services
export {
  supabase,
  auth,
  contractService as contracts,
  userService as users,
  votingService as voting,
  notificationService as notifications,
};
