import { redirect } from 'next/navigation';
import { Settings } from './settings';
import { getUser } from '@/lib/db/actions/users';
import { getTeamForUser } from '@/lib/db/actions/teams';

export default async function SettingsPage() {
  const user = await getUser();

  if (!user) {
    redirect('/sign-in');
  }

  const teamData = await getTeamForUser(user.id);

  if (!teamData) {
    throw new Error('Team not found');
  }

  return <Settings teamData={teamData} />;
}
