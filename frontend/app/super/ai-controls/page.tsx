'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronDown, Play, Edit2, Settings } from 'lucide-react';
import { Toggle } from '@/components/ui/Toggle';

const AI_MODELS = [
  { id: 'gpt4o', name: 'OpenAI GPT-4o', icon: '⊙', tiers: ['Basic', 'Plus', 'Pro'], usage: 579, enabled: true },
  { id: 'edge_speech', name: 'Edge On-Device Speech-to-Text', icon: '◈', tiers: ['Basic', 'Plus', 'Pro'], usage: 4096, enabled: true },
  { id: 'grok', name: 'Grok Insights', icon: '✦', tiers: ['Basic', 'Plus', 'Pro'], usage: 601, enabled: false },
];

const WAVEFORM = [8, 20, 35, 50, 42, 60, 48, 38, 55, 62, 45, 30, 50, 40, 28, 48, 56, 44, 32, 52, 46, 36, 58, 42, 30, 48, 40, 35, 50, 44];


export default function AiControlsPage() {
  const router = useRouter();
  const [models, setModels] = useState(AI_MODELS);
  const [temperature, setTemperature] = useState('0.7');
  const [maxTokens, setMaxTokens] = useState('4096');
  const [responseTimeout, setResponseTimeout] = useState('30s');

  const toggleModel = (id: string) => {
    setModels(prev => prev.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m));
  };

  const totalTokens = models.reduce((a, m) => a + m.usage, 0);

  return (
    <div className="flex-1 flex flex-col min-h-screen w-full overflow-x-hidden" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Top bar */}
      <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 bg-white border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <div className="flex items-center gap-1 text-xs text-slate-400 mb-2 flex-wrap">
              <button onClick={() => router.push('/super/dashboard')} className="hover:text-slate-600 transition-colors whitespace-nowrap">
                Dashboard
              </button>
              <ChevronRight size={12} className="flex-shrink-0" />
              <span className="text-slate-600 font-medium whitespace-nowrap">AI Enhancements</span>
            </div>
            <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-slate-800">AI Model Management — Edge + OpenAI Integration</h1>
          </div>
        </div>
      </div>

      <div className="flex-1 p-3 sm:p-4 lg:p-6 flex flex-col lg:flex-row gap-4 sm:gap-5">
        {/* LEFT column */}
        <div className="flex-1 min-w-0 space-y-4 sm:space-y-5">
          {/* Models table */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 overflow-hidden">
            <div className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 border-b border-slate-100">
              <h3 className="font-semibold text-slate-700 text-sm sm:text-base">Enabled AI Models</h3>
            </div>
            <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ minWidth: '600px' }}>
              <thead style={{ backgroundColor: '#F8FAFC' }}>
                <tr>
                  {['Model', 'Client Tier Access', 'Usage', 'Toggle', 'Actions'].map(h => (
                    <th key={h} className="text-left py-2 sm:py-3 px-3 sm:px-4 md:px-5 text-[10px] sm:text-xs font-semibold text-slate-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {models.map(model => (
                  <tr key={model.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 sm:py-4 px-3 sm:px-4 md:px-5">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div
                          className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-white text-sm sm:text-base font-bold shrink-0"
                          style={{ backgroundColor: '#0F172A' }}
                        >
                          {model.icon}
                        </div>
                        <span className="font-medium text-slate-700 text-xs sm:text-sm">{model.name}</span>
                      </div>
                    </td>
                    <td className="py-3 sm:py-4 px-3 sm:px-4 md:px-5">
                      <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
                        {model.tiers.map(tier => (
                          <span key={tier} className="px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200 whitespace-nowrap">
                            {tier}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 sm:py-4 px-3 sm:px-4 md:px-5">
                      <span className="font-mono text-xs sm:text-sm text-slate-600 whitespace-nowrap">{model.usage.toLocaleString()}</span>
                    </td>
                    <td className="py-3 sm:py-4 px-3 sm:px-4 md:px-5">
                      <Toggle on={model.enabled} onChange={() => toggleModel(model.id)} />
                    </td>
                    <td className="py-3 sm:py-4 px-3 sm:px-4 md:px-5">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <button className="p-1.5 sm:p-2 rounded-lg hover:bg-blue-50 transition-colors" title="Configure" style={{ color: '#2563EB' }}>
                          <Settings size={13} className="sm:w-[14px] sm:h-[14px]" />
                        </button>
                        <button className="p-1.5 sm:p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-500" title="Edit">
                          <Edit2 size={13} className="sm:w-[14px] sm:h-[14px]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>

          {/* Speech-to-Text Preview */}
          <div className="rounded-xl sm:rounded-2xl p-4 sm:p-5" style={{ backgroundColor: '#0F172A' }}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-5">
              <h3 className="font-semibold text-white text-sm sm:text-base">Speech-to-Text Preview</h3>
              <button
                className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold text-white whitespace-nowrap"
                style={{ backgroundColor: '#2563EB' }}
              >
                Test on Canvass App
              </button>
            </div>
            {/* Waveform visualization */}
            <div className="flex items-end justify-center gap-0.5 sm:gap-1 mb-4 sm:mb-6" style={{ height: 72 }}>
              {WAVEFORM.map((h, i) => (
                <div
                  key={i}
                  className="rounded-full"
                  style={{
                    width: 'clamp(3px, 1.5vw, 6px)',
                    height: h,
                    backgroundColor: '#2563EB',
                    opacity: 0.6 + (i % 3) * 0.15,
                  }}
                />
              ))}
            </div>
            {/* Play button */}
            <div className="flex justify-center">
              <button
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-all hover:opacity-90"
                style={{ backgroundColor: '#2563EB' }}
              >
                <Play size={20} className="sm:w-[22px] sm:h-[22px]" fill="white" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT sidebar */}
        <div className="w-full lg:w-72 lg:shrink-0 space-y-3 sm:space-y-4">
          {/* Usage This Month */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5">
            <h3 className="font-semibold text-slate-700 text-sm sm:text-base mb-3 sm:mb-4">Usage This Month</h3>
            <div className="space-y-3 sm:space-y-4">
              {[
                { label: 'Tokens Used This Month', pct: 0.7, display: `${(totalTokens / 1000).toFixed(1)}K`, color: '#2563EB' },
                { label: 'Cost', pct: 1.0, display: '$42.50', color: '#F59E0B' },
                { label: 'Best Breakdown Betmore', pct: 0.2, display: '-20%', color: '#EF4444' },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex items-center justify-between text-[10px] sm:text-xs mb-1 sm:mb-1.5">
                    <span className="text-slate-500 font-medium">{item.label}</span>
                    <span className="font-bold text-slate-700">{item.display}</span>
                  </div>
                  <div className="h-1.5 sm:h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${Math.min(item.pct * 100, 100)}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Advanced AI Configuration */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5">
            <h3 className="font-semibold text-slate-700 text-sm sm:text-base mb-3 sm:mb-4">Advanced AI Configuration</h3>
            <div className="space-y-2.5 sm:space-y-3">
              <div>
                <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">Model Temperature</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="2"
                  value={temperature}
                  onChange={e => setTemperature(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-700 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">Max Tokens</label>
                <div className="relative">
                  <select
                    value={maxTokens}
                    onChange={e => setMaxTokens(e.target.value)}
                    className="w-full appearance-none border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 pr-7 sm:pr-8 text-xs sm:text-sm text-slate-700 focus:outline-none cursor-pointer"
                  >
                    {['1024', '2048', '4096', '8192', '16384'].map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                  <ChevronDown size={12} className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">Response Timeout</label>
                <div className="relative">
                  <select
                    value={responseTimeout}
                    onChange={e => setResponseTimeout(e.target.value)}
                    className="w-full appearance-none border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 pr-7 sm:pr-8 text-xs sm:text-sm text-slate-700 focus:outline-none cursor-pointer"
                  >
                    {['10s', '20s', '30s', '60s', '120s'].map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                  <ChevronDown size={12} className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <button
                className="w-full py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold text-white transition-all hover:opacity-90 mt-1"
                style={{ backgroundColor: '#2563EB' }}
              >
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}