import { Asset } from '@/lib/db/temp-schema/assets.types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

interface AssetCardProps {
  asset: Asset;
}

export function AssetCard({ asset }: AssetCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{asset.name}</span>
          <span className="text-sm font-normal text-muted-foreground capitalize">
            {asset.type}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{asset.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Value:</span>
            <span className="text-sm">{formatCurrency(asset.value)}</span>
          </div>
          {asset.purchaseDate && (
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Purchase Date:</span>
              <span className="text-sm">
                {new Date(asset.purchaseDate).toLocaleDateString()}
              </span>
            </div>
          )}
          {asset.purchasePrice && (
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Purchase Price:</span>
              <span className="text-sm">{formatCurrency(asset.purchasePrice)}</span>
            </div>
          )}
          {asset.location && (
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Location:</span>
              <span className="text-sm">{asset.location}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 