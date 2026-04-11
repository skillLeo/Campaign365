'use client';
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAuthStore } from '@/lib/store';
import { ArrowLeft, Phone, Mail, MapPin, User, Calendar, Tag, MessageSquare, Edit2, Clock } from 'lucide-react';

const mockVoter = {
  id: 1,
  first_name: 'Marcus',
  last_name: 'Williams',
  email: 'marcus.w@email.com',
  phone: '+1 (869) 555-0142',
  address: '14 Bay Road, Basseterre, St. Kitts',
  constituency: 'St. Chris 1',
  polling_station: 'Station A — St. Christopher',
  registration_number: 'SKN-2024-04821',
  dob: '1985-07-22',
  gender: 'Male',
  support_level: 'strong_support',
  voted_last_election: true,
  tags: ['Volunteer', 'Donor', 'Key Supporter'],
  notes: 'Very engaged voter. Has volunteered at 3 events. Interested in economic policy.',
  interactions: [
    { type: 'Canvass Visit', date: 'Oct 6, 2025', notes: 'Home visit — expressed strong support', agent: 'Devon Clarke' },
    { type: 'Phone Call', date: 'Sep 20, 2025', notes: 'Confirmed voting on election day', agent: 'Tamara Lewis' },
    { type: 'Event Attendance', date: 'Sep 5, 2025', notes: 'Attended Grand Rally, Basseterre', agent: 'System' },
    { type: 'SMS Sent', date: 'Aug 15, 2025', notes: 'Voter registration reminder sent', agent: 'System' },
  ],
};

const supportColors: Record<string, string> = {
  strong_support: 'var(--tenant-primary)', leaning_support: '#3B82F6',
  undecided: '#F59E0B', leaning_opposition: '#F97316', opposition: '#EF4444',
};

export default function VoterProfile() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [voter] = useState(mockVoter);
  const { branding } = useAuthStore();
  const primaryColor = 'var(--tenant-primary)';

  const supportLabel = voter.support_level.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const supportColor = supportColors[voter.support_level];

  return (
    <div className="space-y-5 fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-lg transition-colors flex-shrink-0">
            <ArrowLeft size={16} />
          </button>
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-slate-800">{voter.first_name} {voter.last_name}</h1>
            <p className="text-sm text-slate-500 truncate">Voter Profile · {voter.registration_number} · ID: {params?.id}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
          <Button variant="outline" size="sm" icon={<Phone size={13} />}>Call</Button>
          <Button variant="outline" size="sm" icon={<Mail size={13} />}>Email</Button>
          <Button variant="outline" size="sm" icon={<MessageSquare size={13} />}>SMS</Button>
          <Button size="sm" icon={<Edit2 size={13} />} style={{ backgroundColor: primaryColor, borderColor: primaryColor }}>Edit</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="space-y-4">
          <Card className="p-5">
            <div className="text-center mb-4">
              <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-2xl font-bold text-white mb-3" style={{ backgroundColor: primaryColor }}>
                {voter.first_name[0]}{voter.last_name[0]}
              </div>
              <p className="font-bold text-slate-800">{voter.first_name} {voter.last_name}</p>
              <p className="text-xs text-slate-400 mt-0.5">{voter.constituency}</p>
              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: supportColor }}>
                {supportLabel}
              </div>
            </div>
            <div className="space-y-2.5">
              {[
                { icon: Phone, value: voter.phone },
                { icon: Mail, value: voter.email },
                { icon: MapPin, value: voter.address },
                { icon: Calendar, value: `DOB: ${voter.dob}` },
                { icon: User, value: voter.gender },
              ].map(({ icon: Icon, value }, i) => (
                <div key={i} className="flex items-start gap-2.5 text-slate-600">
                  <Icon size={14} className="text-slate-400 mt-0.5 shrink-0" />
                  <span className="text-xs">{value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Tags</p>
            <div className="flex flex-wrap gap-1.5">
              {voter.tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: primaryColor }}>{tag}</span>
              ))}
              <button className="px-2.5 py-1 rounded-full text-xs border border-dashed border-slate-300 text-slate-400 hover:border-slate-400 transition-colors">+ Add Tag</button>
            </div>
          </Card>

          <Card className="p-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Voting Info</p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Polling Station</span>
                <span className="font-medium text-slate-700 text-right text-[10px]">{voter.polling_station}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Voted Last Election</span>
                <Badge variant={voter.voted_last_election ? 'success' : 'danger'} size="sm">{voter.voted_last_election ? 'Yes' : 'No'}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Constituency</span>
                <span className="font-medium text-slate-700">{voter.constituency}</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="col-span-2 space-y-4">
          <Card className="p-5">
            <p className="text-sm font-semibold text-slate-800 mb-3">Notes</p>
            <p className="text-sm text-slate-600 leading-relaxed">{voter.notes}</p>
            <div className="mt-3 pt-3 border-t border-slate-100">
              <textarea rows={2} className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 resize-none focus:outline-none" placeholder="Add a note..." />
              <div className="flex justify-end mt-2">
                <Button size="sm" style={{ backgroundColor: primaryColor, borderColor: primaryColor }}>Save Note</Button>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <p className="text-sm font-semibold text-slate-800 mb-4">Interaction History</p>
            <div className="space-y-4">
              {voter.interactions.map((interaction, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs shrink-0" style={{ backgroundColor: i === 0 ? primaryColor : '#E2E8F0', color: i === 0 ? 'white' : '#94A3B8' }}>
                      <Clock size={13} />
                    </div>
                    {i < voter.interactions.length - 1 && <div className="w-px flex-1 bg-slate-100 my-1" />}
                  </div>
                  <div className="pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-slate-800">{interaction.type}</span>
                      <span className="text-xs text-slate-400">· {interaction.date}</span>
                    </div>
                    <p className="text-xs text-slate-600">{interaction.notes}</p>
                    <p className="text-xs text-slate-400 mt-1">by {interaction.agent}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" icon={<Tag size={13} />} className="mt-2">Log Interaction</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
