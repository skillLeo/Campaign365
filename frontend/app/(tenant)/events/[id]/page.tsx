// Server component wrapper — enables static export for dynamic route
export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }];
}

import EventDetail from './EventDetail';

export default function EventDetailPage() {
  return <EventDetail />;
}
