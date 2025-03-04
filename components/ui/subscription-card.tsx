import { Subscription } from '@/lib/db/temp-schema/subscriptions.types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface SubscriptionCardProps {
  subscription: Subscription;
}

export function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{subscription.name}</span>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="capitalize">
              {subscription.type}
            </Badge>
            <Badge variant="secondary" className="capitalize">
              {subscription.billingFrequency}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{subscription.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Amount:</span>
            <span className="text-sm">{formatCurrency(subscription.amount)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Start Date:</span>
            <span className="text-sm">
              {new Date(subscription.startDate).toLocaleDateString()}
            </span>
          </div>
          {subscription.endDate && (
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">End Date:</span>
              <span className="text-sm">
                {new Date(subscription.endDate).toLocaleDateString()}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Auto-renew:</span>
            <span className="text-sm">{subscription.autoRenew ? 'Yes' : 'No'}</span>
          </div>
          {subscription.category && (
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Category:</span>
              <span className="text-sm">{subscription.category}</span>
            </div>
          )}
          {subscription.notes && (
            <div className="mt-2">
              <p className="text-sm text-muted-foreground">{subscription.notes}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 