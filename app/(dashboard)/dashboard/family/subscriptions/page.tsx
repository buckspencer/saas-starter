import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getSubscriptionsByTeam } from '@/lib/db/actions/subscriptions';
import { getUserWithTeam } from '@/lib/db/actions/users';
import { SubscriptionCard } from '@/components/ui/subscription-card';
import { validatedActionWithUser } from '@/lib/auth/middleware';
import { Subscription } from '@/lib/db/temp-schema/subscriptions.types';
import { z } from 'zod';

const emptySchema = z.object({});

async function getSubscriptions() {
  const result = await validatedActionWithUser(
    emptySchema,
    async (_, __, user) => {
      const userWithTeam = await getUserWithTeam(user.id);
      if (!userWithTeam?.teamId) {
        return { error: 'User is not associated with a team.' };
      }
      const subscriptions = await getSubscriptionsByTeam(userWithTeam.teamId);
      return { subscriptions };
    }
  )({}, new FormData());

  if ('error' in result) {
    return [] as Subscription[];
  }

  return result.subscriptions as Subscription[];
}

export default async function SubscriptionsPage() {
  const subscriptions = await getSubscriptions();

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Subscriptions</h1>
        <Link href="/dashboard/family/subscriptions/new">
          <Button>Add New Subscription</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subscriptions.map((subscription) => (
          <SubscriptionCard key={subscription.id} subscription={subscription} />
        ))}
      </div>

      {subscriptions.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>No Subscriptions Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              You haven&apos;t added any subscriptions yet. Click the button above to add your first subscription.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 