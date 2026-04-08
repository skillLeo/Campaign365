// Server component wrapper — enables static export for dynamic route
export function generateStaticParams() {
  return [{ id: '0' }];
}

import TenantDetail from './TenantDetail';

export default function TenantDetailPage() {
  return <TenantDetail />;
}
