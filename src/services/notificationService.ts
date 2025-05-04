
import { payloadCmsUrl } from './config';

export const notificationService = {
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
