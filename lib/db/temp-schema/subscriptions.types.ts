export type SubscriptionType = 'service' | 'membership' | 'subscription' | 'other';

export type BillingFrequency = 'monthly' | 'quarterly' | 'yearly' | 'one-time';

export interface Subscription {
  id: number;
  name: string;
  type: SubscriptionType;
  description: string;
  amount: number;
  billingFrequency: BillingFrequency;
  startDate: Date;
  endDate?: Date;
  autoRenew: boolean;
  category?: string;
  notes?: string;
  teamId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SubscriptionCreate {
  name: string;
  type: SubscriptionType;
  description: string;
  amount: number;
  billingFrequency: BillingFrequency;
  startDate: Date;
  endDate?: Date;
  autoRenew: boolean;
  category?: string;
  notes?: string;
}

export interface SubscriptionUpdate {
  name?: string;
  type?: SubscriptionType;
  description?: string;
  amount?: number;
  billingFrequency?: BillingFrequency;
  startDate?: Date;
  endDate?: Date;
  autoRenew?: boolean;
  category?: string;
  notes?: string;
} 