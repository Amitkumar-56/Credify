export type CaseStatus = 'Pending' | 'Verified' | 'Failed';

export interface PanVerificationCase {
  id: string; // Case/reference ID
  applicantName: string;
  mobileNumber: string;
  panNumber: string; // Will be masked in UI
  purpose: string;
  consentGiven: boolean;
  verificationDate: string;
  status: CaseStatus;
  
  // Verification result fields (populated if Verified or Failed)
  panStatus?: 'Active' | 'Invalid';
  nameMatchStatus?: 'Matched' | 'Mismatched' | 'N/A';
}

export interface DashboardMetrics {
  total: number;
  pending: number;
  verified: number;
  failed: number;
}
