'use client';
import { CalendarClock, Instagram, Facebook, MessageCircle, CheckCircle2, Clock3, Sparkles } from 'lucide-react';

const POSTS = [
  { title: 'Manifesto highlight reel', channel: 'Instagram', time: 'Today - 6:30 PM', status: 'scheduled' },
  { title: 'Candidate market walk album', channel: 'Facebook', time: 'Tomorrow - 8:00 AM', status: 'draft' },
  { title: 'Rapid rebuttal clip', channel: 'WhatsApp', time: 'Apr 15 - 12:15 PM', status: 'approval' },
];

const CHANNELS = [
  { label: 'Instagram', icon: Instagram, accent: '#EC4899', count: '14 scheduled' },
  { label: 'Facebook', icon: Facebook, accent: '#2563EB', count: '9 scheduled' },
  { label: 'WhatsApp', icon: MessageCircle, accent: '#16A34A', count: '6 scheduled' },
];

const APPROVAL_STEPS = [
  { label: 'Draft review', icon: Clock3, color: '#475569' },
  { label: 'Legal and compliance signoff', icon: CheckCircle2, color: '#16A34A' },
  { label: 'AI copy assist enabled', icon: Sparkles, color: 'var(--tenant-primary)' },
];

export default function SocialSchedulerPage() {
  return (
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-5">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800">Social Media Scheduler</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Plan campaign content, queue approvals, and coordinate social publishing windows.</p>
        </div>
        <button className="px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ backgroundColor: 'var(--tenant-primary)' }}>
          Create scheduled post
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {CHANNELS.map(channel => (
          <div key={channel.label} className="bg-white rounded-2xl border border-slate-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${channel.accent}18` }}>
                <channel.icon size={19} style={{ color: channel.accent }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">{channel.label}</p>
                <p className="text-xs text-slate-500">{channel.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-4 sm:gap-5">
        <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-4">
            <CalendarClock size={16} style={{ color: 'var(--tenant-primary)' }} />
            <h2 className="text-sm font-semibold text-slate-800">Publishing Queue</h2>
          </div>
          <div className="space-y-3">
            {POSTS.map(post => (
              <div key={post.title} className="rounded-2xl border border-slate-100 p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{post.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{post.channel} - {post.time}</p>
                  </div>
                  <span
                    className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase"
                    style={post.status === 'scheduled'
                      ? { backgroundColor: '#DCFCE7', color: '#15803D' }
                      : post.status === 'approval'
                        ? { backgroundColor: '#FEF3C7', color: '#B45309' }
                        : { backgroundColor: '#E2E8F0', color: '#475569' }}
                  >
                    {post.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5">
            <h2 className="text-sm font-semibold text-slate-800 mb-4">Content Blocks</h2>
            <div className="space-y-3">
              {[
                ['Issue Explainers', 'Short clips breaking down policy points for persuadable audiences.'],
                ['Candidate Trail', 'Photo and video slots from rallies, visits, and town halls.'],
                ['Rapid Response', 'Ready-made rebuttal templates for breaking moments.'],
              ].map(([title, copy]) => (
                <div key={title} className="rounded-2xl border border-slate-100 p-4 bg-slate-50">
                  <p className="text-sm font-semibold text-slate-800">{title}</p>
                  <p className="text-xs text-slate-500 mt-2">{copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5">
            <h2 className="text-sm font-semibold text-slate-800 mb-4">Approval Workflow</h2>
            <div className="space-y-3">
              {APPROVAL_STEPS.map(step => (
                <div key={step.label} className="flex items-center gap-3 rounded-2xl border border-slate-100 p-4">
                  <step.icon size={16} style={{ color: step.color }} />
                  <p className="text-sm text-slate-600">{step.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
