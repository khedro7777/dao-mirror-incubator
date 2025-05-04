
import { payloadCmsUrl } from './config';

export const contractService = {
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
  
  // Add any other contract-related methods here
};
