import { Contact, ContactCreate, ContactUpdate } from '@/lib/db/temp-schema/contacts.types';

// This will be replaced with actual database operations
const contacts: Contact[] = [];

export async function getContactsByTeam(teamId: number): Promise<Contact[]> {
  return contacts.filter(contact => contact.teamId === teamId);
}

export async function getContactById(id: number): Promise<Contact | null> {
  return contacts.find(contact => contact.id === id) || null;
}

export async function getContactsByUser(userId: number): Promise<Contact[]> {
  return contacts.filter(contact => contact.userId === userId);
}

export async function getContactsByTeamAndType(teamId: number, type: Contact['type']): Promise<Contact[]> {
  return contacts.filter(contact => contact.teamId === teamId && contact.type === type);
}

export async function createContact(data: ContactCreate): Promise<Contact> {
  const newContact: Contact = {
    id: contacts.length + 1,
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  contacts.push(newContact);
  return newContact;
}

export async function updateContact(id: number, data: ContactUpdate): Promise<Contact | null> {
  const index = contacts.findIndex(contact => contact.id === id);
  if (index === -1) return null;

  contacts[index] = {
    ...contacts[index],
    ...data,
    updatedAt: new Date(),
  };
  return contacts[index];
}

export async function deleteContact(id: number): Promise<boolean> {
  const index = contacts.findIndex(contact => contact.id === id);
  if (index === -1) return false;

  contacts.splice(index, 1);
  return true;
} 