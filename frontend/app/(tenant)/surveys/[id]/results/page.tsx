// Server component wrapper — enables static export for dynamic route
export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }];
}

import SurveyResults from './SurveyResults';

export default function SurveyResultsPage() {
  return <SurveyResults />;
}
