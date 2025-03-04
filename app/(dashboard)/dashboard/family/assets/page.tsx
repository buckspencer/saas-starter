import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAssetsByTeam } from '@/lib/db/actions/assets';
import { getUserWithTeam } from '@/lib/db/actions/users';
import { AssetCard } from '@/components/ui/asset-card';
import { validatedActionWithUser } from '@/lib/auth/middleware';
import { Asset } from '@/lib/db/temp-schema/assets.types';
import { z } from 'zod';

const emptySchema = z.object({});

async function getAssets() {
  const result = await validatedActionWithUser(
    emptySchema,
    async (_, __, user) => {
      const userWithTeam = await getUserWithTeam(user.id);
      if (!userWithTeam?.teamId) {
        return { error: 'User is not associated with a team.' };
      }
      const assets = await getAssetsByTeam(userWithTeam.teamId);
      return { assets };
    }
  )({}, new FormData());

  if ('error' in result) {
    return [] as Asset[];
  }

  return result.assets as Asset[];
}

export default async function AssetsPage() {
  const assets = await getAssets();

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Assets</h1>
        <Link href="/dashboard/family/assets/new">
          <Button>Add New Asset</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.map((asset: Asset) => (
          <AssetCard key={asset.id} asset={asset} />
        ))}
      </div>

      {assets.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>No Assets Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              You haven't added any assets yet. Click the button above to add your first asset.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 