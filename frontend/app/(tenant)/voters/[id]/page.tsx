// Server component wrapper — enables static export for dynamic route
export function generateStaticParams() {
  // Static placeholders — real IDs resolved client-side via useParams()
  return [
    { id: '0' },
    { id: '1' },
    { id: '2' },
  ];
}

import VoterProfile from './VoterProfile';

export default function VoterProfilePage() {
  return <VoterProfile />;
}
