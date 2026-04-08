// Server component wrapper — enables static export for dynamic route
export function generateStaticParams() {
  // Return a placeholder so Next.js generates the route shell.
  // The real voter ID is resolved client-side by useParams().
  return [{ id: '0' }];
}

import VoterProfile from './VoterProfile';

export default function VoterProfilePage() {
  return <VoterProfile />;
}
