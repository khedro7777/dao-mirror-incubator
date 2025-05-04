
import { payloadCmsUrl } from './config';

export const votingService = {
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
};
