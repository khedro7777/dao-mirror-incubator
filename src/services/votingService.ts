
import { payloadCmsUrl } from './config';

export const votingService = {
  // Submit a vote on a contract term
  submitVote: async (voteData: {
    userId: string;
    contractTermId: string;
    vote: 'yes' | 'no' | 'abstain';
  }) => {
    try {
      const response = await fetch(`${payloadCmsUrl}/api/votes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: voteData.userId,
          contractTerm: voteData.contractTermId,
          vote: voteData.vote,
          timestamp: new Date().toISOString(),
          otpVerified: false, // Can be updated later with OTP verification
        }),
      });
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error submitting vote:', error);
      return { success: false, error };
    }
  },

  // Get votes for a specific contract term
  getVotesByTermId: async (termId: string) => {
    try {
      const response = await fetch(`${payloadCmsUrl}/api/votes?where[contractTerm][equals]=${termId}`);
      const data = await response.json();
      return { success: true, data: data.docs };
    } catch (error) {
      console.error(`Error fetching votes for term ${termId}:`, error);
      return { success: false, error };
    }
  },

  // Get all user votes for a contract
  getUserVotes: async (userId: string, contractId: string) => {
    try {
      const response = await fetch(
        `${payloadCmsUrl}/api/votes?where[user][equals]=${userId}&where[contractTerm][contains][contract][equals]=${contractId}`
      );
      const data = await response.json();
      return { success: true, data: data.docs };
    } catch (error) {
      console.error(`Error fetching user votes:`, error);
      return { success: false, error };
    }
  },
  
  // Tally and summarize votes for a contract term
  tallyVotes: async (termId: string) => {
    try {
      const response = await fetch(`${payloadCmsUrl}/api/votes?where[contractTerm][equals]=${termId}`);
      const data = await response.json();
      
      // Initialize counters
      const tally = {
        yes: 0,
        no: 0,
        abstain: 0,
        total: 0
      };
      
      // Count votes
      if (data.docs && Array.isArray(data.docs)) {
        data.docs.forEach((vote: any) => {
          if (vote.vote === 'yes') tally.yes++;
          else if (vote.vote === 'no') tally.no++;
          else if (vote.vote === 'abstain') tally.abstain++;
        });
        tally.total = data.docs.length;
      }
      
      return { 
        success: true, 
        data: tally
      };
    } catch (error) {
      console.error(`Error tallying votes for term ${termId}:`, error);
      return { success: false, error };
    }
  },
};
