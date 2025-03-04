'use server';

import { z } from 'zod';
import { validatedActionWithUser } from '@/lib/auth/middleware';
import { getUserWithTeam } from '@/lib/db/actions/users';
import { createAsset as createAssetAction } from '@/lib/db/actions/assets';

const assetSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['property', 'vehicle', 'investment', 'insurance', 'other'], {
    required_error: 'Asset type is required',
  }),
  description: z.string().min(1, 'Description is required'),
  value: z.coerce.number().min(0, 'Value must be greater than or equal to 0'),
  purchaseDate: z.string().optional(),
  purchasePrice: z.coerce.number().optional(),
  location: z.string().optional(),
  notes: z.string().optional(),
});

export const createAsset = validatedActionWithUser(
  assetSchema,
  async (data, _, user) => {
    const userWithTeam = await getUserWithTeam(user.id);
    if (!userWithTeam?.teamId) {
      return { error: 'User is not associated with a team.' };
    }

    try {
      const newAsset = await createAssetAction({
        ...data,
        purchaseDate: data.purchaseDate ? new Date(data.purchaseDate) : undefined,
        teamId: userWithTeam.teamId,
        userId: user.id,
      });

      return { success: 'Asset created successfully.' };
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Failed to create asset.' };
    }
  }
); 