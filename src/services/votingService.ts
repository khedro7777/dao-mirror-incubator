
import { payloadCmsUrl } from './config';

export const votingService = {
  // Check if user has appropriate role to vote
  canUserVote: (userRole?: string) => {
    if (!userRole) return false;
    const votingEligibleRoles = ['supplier', 'investor', 'buyer'];
    return votingEligibleRoles.includes(userRole.toLowerCase());
  },

  // Check if user can submit proposals
  canUserSubmitProposal: (userRole?: string) => {
    if (!userRole) return false;
    const proposalEligibleRoles = ['supplier', 'investor', 'buyer', 'freelancer'];
    return proposalEligibleRoles.includes(userRole.toLowerCase());
  },

  // Get proposals that are relevant to a user based on their role
  getRelevantProposalsForUser: (proposals: any[], userRole?: string) => {
    if (!userRole) return [];
    
    return proposals.filter(proposal => {
      if (userRole === 'supplier' || userRole === 'buyer') {
        if (proposal.category === 'group-buying') return true;
      }
      
      if (userRole === 'investor') {
        if (proposal.category === 'funding') return true;
      }
      
      if (userRole === 'freelancer') {
        return true; // Freelancers can see all proposals
      }
      
      return false;
    });
  },

  // Submit a vote on a contract term
  submitVote: async (voteData: {
    userId: string;
    contractTermId: string;
    vote: 'yes' | 'no' | 'abstain';
    userRole?: string;
  }) => {
    try {
      // Validate if user has appropriate role to vote
      if (!votingService.canUserVote(voteData.userRole)) {
        return { success: false, error: 'User role not authorized to vote' };
      }
      
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

  // Submit a proposal or comment (for freelancers or other roles)
  submitProposal: async (proposalData: {
    userId: string;
    contractId: string;
    title: string;
    content: string;
    type: 'proposal' | 'comment' | 'service';
    category?: 'group-buying' | 'funding' | 'freelance';
    userRole?: string;
    price?: number;
    currency?: string;
    deliverables?: Array<{
      title: string;
      description?: string;
      deadline?: string;
    }>;
  }) => {
    try {
      // Validate if user has appropriate role to submit proposal
      if (!votingService.canUserSubmitProposal(proposalData.userRole)) {
        return { success: false, error: 'User role not authorized to submit proposals' };
      }
      
      const response = await fetch(`${payloadCmsUrl}/api/proposals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: proposalData.userId,
          contract: proposalData.contractId,
          title: proposalData.title,
          content: proposalData.content,
          type: proposalData.type,
          category: proposalData.category || 
            (proposalData.userRole === 'freelancer' ? 'freelance' : 
             proposalData.userRole === 'investor' ? 'funding' : 'group-buying'),
          timestamp: new Date().toISOString(),
          status: 'pending',
          price: proposalData.price,
          currency: proposalData.currency,
          deliverables: proposalData.deliverables,
        }),
      });
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error submitting proposal:', error);
      return { success: false, error };
    }
  },

  // Get proposals for a specific contract
  getProposalsByContractId: async (contractId: string) => {
    try {
      const response = await fetch(`${payloadCmsUrl}/api/proposals?where[contract][equals]=${contractId}`);
      const data = await response.json();
      return { success: true, data: data.docs };
    } catch (error) {
      console.error(`Error fetching proposals for contract ${contractId}:`, error);
      return { success: false, error };
    }
  },

  // Get all proposals for a specific category
  getProposalsByCategory: async (category: 'group-buying' | 'funding' | 'freelance') => {
    try {
      const response = await fetch(`${payloadCmsUrl}/api/proposals?where[category][equals]=${category}`);
      const data = await response.json();
      return { success: true, data: data.docs };
    } catch (error) {
      console.error(`Error fetching proposals for category ${category}:`, error);
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
