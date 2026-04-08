// Server component wrapper — enables static export for dynamic route
export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }];
}

import WalkListDetail from './WalkListDetail';

export default function WalkListDetailPage() {
  return <WalkListDetail />;
}
