'use server';

import { z } from 'zod';
import { validatedActionWithUser } from '@/lib/auth/middleware';
import { ActivityType } from '@/lib/db/schema';
import { getUserWithTeam } from '@/lib/db/actions/users';
import { createContact as createContactAction } from '@/lib/db/actions/contacts';

// This will be replaced with actual database operations
const contacts: any[] = [];

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['family', 'medical', 'financial', 'legal', 'service', 'other'], {
    required_error: 'Contact type is required',
  }),
  relationship: z.string().min(1, 'Relationship is required'),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  address: z.string().optional(),
  notes: z.string().optional(),
});

export const createContact = validatedActionWithUser(
  contactSchema,
  async (data, _, user) => {
    const userWithTeam = await getUserWithTeam(user.id);
    if (!userWithTeam?.teamId) {
      return { error: 'User is not associated with a team.' };
    }

    const newContact = await createContactAction({
      ...data,
      teamId: userWithTeam.teamId,
      userId: user.id,
    });

    return { success: 'Contact created successfully.' };
  }
);

export const updateContact = validatedActionWithUser(
  contactSchema.extend({
    id: z.number(),
  }),
  async (data, _, user) => {
    const { id, ...updateData } = data;
    // This will be replaced with actual database operation
    const contactIndex = contacts.findIndex(c => c.id === id);
    if (contactIndex === -1) {
      return { error: 'Contact not found.' };
    }

    contacts[contactIndex] = {
      ...contacts[contactIndex],
      ...updateData,
      updatedAt: new Date(),
    };

    return { success: 'Contact updated successfully.' };
  }
);

export const deleteContact = validatedActionWithUser(
  z.object({
    id: z.number(),
  }),
  async (data, _, user) => {
    const { id } = data;
    // This will be replaced with actual database operation
    const contactIndex = contacts.findIndex(c => c.id === id);
    if (contactIndex === -1) {
      return { error: 'Contact not found.' };
    }

    contacts.splice(contactIndex, 1);

    return { success: 'Contact deleted successfully.' };
  }
); 