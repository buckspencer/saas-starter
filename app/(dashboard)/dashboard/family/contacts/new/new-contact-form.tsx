'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useActionState } from 'react';
import { createContact } from '../actions';
import { useRouter } from 'next/navigation';

const contactTypes = [
  { value: 'family', label: 'Family Member' },
  { value: 'medical', label: 'Medical Provider' },
  { value: 'financial', label: 'Financial Advisor' },
  { value: 'legal', label: 'Legal Representative' },
  { value: 'service', label: 'Service Provider' },
  { value: 'other', label: 'Other' },
] as const;

type ActionState = {
  error?: string;
  success?: string;
};

export default function NewContactForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    createContact,
    { error: '', success: '' }
  );

  React.useEffect(() => {
    if (state.success) {
      router.push('/dashboard/family/contacts');
    }
  }, [state.success, router]);

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Contact</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter contact name" required {...field} />
                  </FormControl>
                  <FormDescription>
                    Full name of the contact
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Type *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} required>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {contactTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the type of contact
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="relationship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relationship *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Primary Care Physician" required {...field} />
                  </FormControl>
                  <FormDescription>
                    Describe your relationship with this contact
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email address" {...field} />
                  </FormControl>
                  <FormDescription>
                    Contact's email address (optional)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Contact's phone number (optional)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter full address"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Contact's full address (optional)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any additional notes about this contact"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {state.error && (
              <div className="text-sm text-red-500">{state.error}</div>
            )}

            <div className="flex justify-end space-x-4">
              <Link href="/dashboard/family/contacts">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Saving...' : 'Save Contact'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 