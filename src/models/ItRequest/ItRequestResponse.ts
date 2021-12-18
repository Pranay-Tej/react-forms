export interface ItRequestResponse {
  id: number;
  user: string;
  reason: string;
  otherReason?: string;
  brand: string;
  model: string;
  os: string;
  software: string[];
}
