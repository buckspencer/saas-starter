export type AssetType = 'property' | 'vehicle' | 'investment' | 'insurance' | 'other';

export interface Asset {
  id: number;
  name: string;
  type: AssetType;
  description: string;
  value: number;
  purchaseDate?: Date;
  purchasePrice?: number;
  location?: string;
  documents?: string[];
  notes?: string;
  teamId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AssetCreate {
  name: string;
  type: AssetType;
  description: string;
  value: number;
  purchaseDate?: Date;
  purchasePrice?: number;
  location?: string;
  documents?: string[];
  notes?: string;
}

export interface AssetUpdate {
  name?: string;
  type?: AssetType;
  description?: string;
  value?: number;
  purchaseDate?: Date;
  purchasePrice?: number;
  location?: string;
  documents?: string[];
  notes?: string;
} 