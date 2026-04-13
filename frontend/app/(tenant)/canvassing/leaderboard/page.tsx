'use client';
import { Flame, Medal, Trophy, Star, Target } from 'lucide-react';

const STANDINGS = [
  { name: 'Alicia Grant', team: 'Team Alpha', points: 2460, streak: 12, badge: 'Closer' },
  { name: 'Devon Lewis', team: 'Team Bravo', points: 2285, streak: 9, badge: 'Script Master' },
  { name: 'Marsha Blake', team: 'Team Echo', points: 2144, streak: 11, badge: 'Momentum' },
  { name: 'Kareem Brown', team: 'Team Delta', points: 2012, streak: 8, badge: 'Door Finisher' },
];

const BADGES = [
  ['Closer', 'Highest persuasion conversion rate this week'],
  ['Door Finisher', 'Most completed doors in a single shift'],
  ['Momentum', 'Five consecutive above-goal days'],
  ['Script Master', 'Best positive sentiment score'],
];

export default function CanvasserLeaderboardPage() {
  return (
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-5">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800">Canvasser Leaderboard</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Gamify field performance with points, streaks, and team recognition.</p>
        </div>
        <button className="px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ backgroundColor: 'var(--tenant-primary)' }}>
          Publish weekly winners
        </button>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Top Score', value: '2,460', icon: Trophy, bg: '#FEF3C7', color: '#B45309' },
          { label: 'Active Streak', value: '12 days', icon: Flame, bg: '#FEF2F2', color: 'var(--tenant-primary)' },
          { label: 'Badges Unlocked', value: '37', icon: Medal, bg: '#EFF6FF', color: '#2563EB' },
          { label: 'Goal Hit Rate', value: '88%', icon: Target, bg: '#ECFDF5', color: '#16A34A' },
        ].map(card => (
          <div key={card.label} className="bg-white rounded-2xl border border-slate-100 p-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: card.bg }}>
              <card.icon size={18} style={{ color: card.color }} />
            </div>
            <p className="text-2xl font-bold text-slate-800">{card.value}</p>
            <p className="text-xs text-slate-500 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-4 sm:gap-5">
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-4 sm:px-5 py-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-800">This Week's Standings</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {STANDINGS.map((member, index) => (
              <div key={member.name} className="px-4 sm:px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-bold" style={{ backgroundColor: index === 0 ? 'var(--tenant-primary)' : '#0F172A' }}>
                  #{index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-slate-800">{member.name}</p>
                    <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-600">{member.badge}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{member.team}</p>
                </div>
                <div className="grid grid-cols-3 gap-3 sm:gap-6 text-left sm:text-right">
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">Points</p>
                    <p className="text-sm font-bold text-slate-800">{member.points}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">Streak</p>
                    <p className="text-sm font-bold text-orange-600">{member.streak}d</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">Rating</p>
                    <p className="text-sm font-bold text-emerald-600">Elite</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5">
            <h2 className="text-sm font-semibold text-slate-800 mb-4">Badge Library</h2>
            <div className="space-y-3">
              {BADGES.map(([title, copy]) => (
                <div key={title} className="rounded-2xl border border-slate-100 p-4">
                  <div className="flex items-center gap-2">
                    <Star size={15} style={{ color: 'var(--tenant-primary)' }} />
                    <p className="text-sm font-semibold text-slate-800">{title}</p>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">{copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5">
            <h2 className="text-sm font-semibold text-slate-800 mb-4">Reward Triggers</h2>
            <div className="space-y-3">
              {[
                '500 points unlocks premium walk list priority.',
                '10-day streak unlocks a team spotlight card.',
                'Top sentiment lift earns campaign war-room recognition.',
              ].map(item => (
                <div key={item} className="rounded-2xl bg-slate-50 px-4 py-3">
                  <p className="text-sm text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
