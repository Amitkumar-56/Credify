import type { PanVerificationCase } from './types';

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  login: async (email: string, password: string):Promise<{token: string, name: string}> => {
    await delay(1000);
    if (email === 'demo@credify.in' && password === 'demo123') {
      return { token: 'mock-jwt-token-12345', name: 'Demo User' };
    }
    throw new Error('Invalid email or password. Use demo@credify.in / demo123');
  },

  verifyPan: async (data: Partial<PanVerificationCase>): Promise<PanVerificationCase> => {
    await delay(1500);

    if (!data.consentGiven) {
      throw new Error('Customer consent is required');
    }

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!data.panNumber || !panRegex.test(data.panNumber.toUpperCase())) {
      throw new Error('Invalid PAN format');
    }

    // Simulate random failure (1 in 5 chance) to demonstrate API error handling
    if (Math.random() < 0.2) {
      throw new Error('Mock API Request Failed: Verification server timeout.');
    }

    const now = new Date().toISOString();
    const isSuccess = Math.random() > 0.3; // 70% success rate

    const newCase: PanVerificationCase = {
      id: `CRD-${Math.floor(100000 + Math.random() * 900000)}`,
      applicantName: data.applicantName || 'Unknown',
      mobileNumber: data.mobileNumber || '',
      panNumber: data.panNumber.toUpperCase(),
      purpose: data.purpose || '',
      consentGiven: data.consentGiven,
      verificationDate: now,
      status: isSuccess ? 'Verified' : 'Failed',
      panStatus: isSuccess ? 'Active' : 'Invalid',
      nameMatchStatus: isSuccess ? 'Matched' : 'Mismatched'
    };

    return newCase;
  }
};

export const getExternalUsers = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching third-party data:", error);
    throw error;
  }
};
