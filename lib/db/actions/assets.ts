import { Asset, AssetCreate, AssetUpdate } from '@/lib/db/temp-schema/assets.types';

// This will be replaced with actual database operations
const assets: Asset[] = [
  {
    id: 1,
    name: 'Primary Residence',
    type: 'property',
    description: 'Family home in suburban area',
    value: 750000,
    purchaseDate: new Date('2020-06-15'),
    purchasePrice: 650000,
    location: '123 Main St, Anytown, USA',
    notes: '3 bedrooms, 2 bathrooms, 2,500 sq ft',
    teamId: 1,
    userId: 1,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 2,
    name: 'Tesla Model 3',
    type: 'vehicle',
    description: 'Electric vehicle for daily commute',
    value: 45000,
    purchaseDate: new Date('2023-03-20'),
    purchasePrice: 48000,
    location: 'Garage at home',
    notes: 'Autopilot enabled, premium interior',
    teamId: 1,
    userId: 1,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 3,
    name: 'Vanguard Index Fund',
    type: 'investment',
    description: 'S&P 500 index fund for retirement',
    value: 250000,
    purchaseDate: new Date('2022-01-10'),
    purchasePrice: 200000,
    notes: 'Monthly contributions of $1,000',
    teamId: 1,
    userId: 1,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 4,
    name: 'Life Insurance Policy',
    type: 'insurance',
    description: 'Term life insurance for family protection',
    value: 1000000,
    purchaseDate: new Date('2021-08-05'),
    purchasePrice: 1200,
    notes: '20-year term, $100 monthly premium',
    teamId: 1,
    userId: 1,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 5,
    name: 'Vacation Home',
    type: 'property',
    description: 'Beachfront property for family vacations',
    value: 1200000,
    purchaseDate: new Date('2023-11-30'),
    purchasePrice: 1150000,
    location: '456 Ocean Dr, Beach City, USA',
    notes: '4 bedrooms, 3 bathrooms, ocean view',
    teamId: 1,
    userId: 1,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

export async function getAssetsByTeam(teamId: number): Promise<Asset[]> {
  if (!teamId) throw new Error('Team ID is required');
  return assets.filter(asset => asset.teamId === teamId);
}

export async function getAssetById(id: number): Promise<Asset | null> {
  if (!id) throw new Error('Asset ID is required');
  return assets.find(asset => asset.id === id) || null;
}

export async function getAssetsByUser(userId: number): Promise<Asset[]> {
  if (!userId) throw new Error('User ID is required');
  return assets.filter(asset => asset.userId === userId);
}

export async function getAssetsByTeamAndType(teamId: number, type: Asset['type']): Promise<Asset[]> {
  if (!teamId) throw new Error('Team ID is required');
  if (!type) throw new Error('Asset type is required');
  return assets.filter(asset => asset.teamId === teamId && asset.type === type);
}

export async function createAsset(data: AssetCreate & { teamId: number; userId: number }): Promise<Asset> {
  if (!data.teamId) throw new Error('Team ID is required');
  if (!data.userId) throw new Error('User ID is required');
  if (!data.name) throw new Error('Name is required');
  if (!data.type) throw new Error('Type is required');
  if (!data.description) throw new Error('Description is required');
  if (typeof data.value !== 'number') throw new Error('Value must be a number');

  const newAsset: Asset = {
    id: assets.length + 1,
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  assets.push(newAsset);
  return newAsset;
}

export async function updateAsset(id: number, data: AssetUpdate): Promise<Asset | null> {
  if (!id) throw new Error('Asset ID is required');
  if (data.value !== undefined && typeof data.value !== 'number') {
    throw new Error('Value must be a number');
  }

  const assetIndex = assets.findIndex(asset => asset.id === id);
  if (assetIndex === -1) return null;

  assets[assetIndex] = {
    ...assets[assetIndex],
    ...data,
    updatedAt: new Date(),
  };

  return assets[assetIndex];
}

export async function deleteAsset(id: number): Promise<boolean> {
  if (!id) throw new Error('Asset ID is required');
  const assetIndex = assets.findIndex(asset => asset.id === id);
  if (assetIndex === -1) return false;

  assets.splice(assetIndex, 1);
  return true;
} 