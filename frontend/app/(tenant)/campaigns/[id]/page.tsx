// Server component wrapper — enables static export for dynamic route
export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }];
}

import CampaignDetail from './CampaignDetail';

export default function CampaignDetailPage() {
  return <CampaignDetail />;
}
