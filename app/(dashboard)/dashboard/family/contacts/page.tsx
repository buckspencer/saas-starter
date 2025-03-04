'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { ContactCard } from '@/components/ui/contact-card';
import { Contact } from '@/lib/db/temp-schema/contacts.types';
import { deleteContact } from './actions';

type ActionState = {
  error?: string;
  success?: string;
};

// Sample contacts for development
const sampleContacts: Contact[] = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    type: 'medical',
    relationship: 'Primary Care Physician',
    email: 'sarah.johnson@healthcare.com',
    phone: '(555) 123-4567',
    address: '123 Medical Center Dr, Suite 100\nSan Francisco, CA 94105',
    notes: 'Family doctor for the past 5 years. Specializes in preventive care.',
    teamId: 1,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'Michael Chen',
    type: 'financial',
    relationship: 'Financial Advisor',
    email: 'm.chen@wealthmanagement.com',
    phone: '(555) 987-6543',
    address: '456 Financial District\nSan Francisco, CA 94104',
    notes: 'Handles family investments and retirement planning.',
    teamId: 1,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: 'Aunt Emily',
    type: 'family',
    relationship: 'Maternal Aunt',
    email: 'emily@email.com',
    phone: '(555) 555-5555',
    address: '789 Family Lane\nOakland, CA 94601',
    notes: 'Emergency contact and family support.',
    teamId: 1,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function ContactsPage() {
  // Using sample contacts instead of empty array
  const contacts = sampleContacts;

  const handleDelete = async (contact: Contact) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      const result = await deleteContact({ id: contact.id }, new FormData());
      if (result.error) {
        alert(result.error);
      } else {
        // Refresh the page or update the contacts list
        window.location.reload();
      }
    }
  };

  const handleEdit = (contact: Contact) => {
    // This will be implemented when we add the edit functionality
    console.log('Edit contact:', contact);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Contacts</h1>
        <Link href="/dashboard/family/contacts/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Contact
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No contacts yet. Add your first contact to get started.</p>
          </div>
        ) : (
          contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
} 