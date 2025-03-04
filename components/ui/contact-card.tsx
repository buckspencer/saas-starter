'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, Mail, Phone, MapPin } from 'lucide-react';
import { Contact } from '@/lib/db/temp-schema/contacts.types';

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
}

export function ContactCard({ contact, onEdit, onDelete }: ContactCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">{contact.name}</CardTitle>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(contact)}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(contact)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">
            {contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}
            {contact.relationship && ` • ${contact.relationship}`}
          </div>
          
          {contact.email && (
            <div className="flex items-center text-sm">
              <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
              <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                {contact.email}
              </a>
            </div>
          )}
          
          {contact.phone && (
            <div className="flex items-center text-sm">
              <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
              <a href={`tel:${contact.phone}`} className="text-blue-600 hover:underline">
                {contact.phone}
              </a>
            </div>
          )}
          
          {contact.address && (
            <div className="flex items-center text-sm">
              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{contact.address}</span>
            </div>
          )}
          
          {contact.notes && (
            <div className="mt-2 text-sm text-muted-foreground">
              {contact.notes}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 