'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronDown, Play } from 'lucide-react';

const AI_MODELS = [
  { id: 'gpt4o', name: 'OpenAI GPT-4o', icon: '⊙', tiers: ['Basic', 'Plus', 'Pro'], usage: 579, enabled: true },
  { id: 'edge_speech', name: 'Edge On-Device Speech-to-Text', icon: '◈', tiers: ['Basic', 'Plus', 'Pro'], usage: 4096, enabled: true },
  { id: 'grok', name: 'Grok Insights', icon: '✦', tiers: ['Basic', 'Plus', 'Pro'], usage: 601, enabled: false },
];

const WAVEFORM = [8, 20, 35, 50, 42, 60, 48, 38, 55, 62, 45, 30, 50, 40, 28, 48, 56, 44, 32, 52, 46, 36, 58, 42, 30, 48, 40, 35, 50, 44];

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className="relative w-9 h-5 rounded-full transition-all duration-200 focus:outline-none shrink-0"
      style={{ backgroundColor: on ? '#2563EB' : '#CBD5E1' }}
    >
      <span
        className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
        style={{ transform: on ? 'translateX(1.125rem)' : 'translateX(0.125rem)' }}
      />
    </button>
  );
}

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
    <div className="flex-1 flex flex-col min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Top bar */}
      <div className="px-6 py-4 bg-white border-b border-slate-100">
        <div className="flex items-center gap-1 text-xs text-slate-400 mb-2">
          <button onClick={() => router.push('/super/dashboard')} className="hover:text-slate-600 transition-colors">
            Dashboard
          </button>
          <ChevronRight size={12} />
          <span className="text-slate-600 font-medium">AI Enhancements</span>
        </div>
        <h1 className="text-xl font-bold text-slate-800">AI Model Management - Edge + OpenAI Integration</h1>
      </div>

      <div className="flex-1 p-4 lg:p-6 flex flex-col lg:flex-row gap-5">
        {/* LEFT column */}
        <div className="flex-1 min-w-0 space-y-5">
          {/* Models table */}
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h3 className="font-semibold text-slate-700 text-sm">Enabled AI Models</h3>
            </div>
            <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: '#F8FAFC' }}>
                <tr>
                  {['Model', 'Client Tier Access', 'Usage', 'Toggle'].map(h => (
                    <th key={h} className="text-left py-3 px-5 text-xs font-semibold text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {models.map(model => (
                  <tr key={model.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-base font-bold shrink-0"
                          style={{ backgroundColor: '#0F172A' }}
                        >
                          {model.icon}
                        </div>
                        <span className="font-medium text-slate-700">{model.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-1.5">
                        {model.tiers.map(tier => (
                          <span key={tier} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200">
                            {tier}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <span className="font-mono text-sm text-slate-600">{model.usage.toLocaleString()}</span>
                    </td>
                    <td className="py-4 px-5">
                      <Toggle on={model.enabled} onChange={() => toggleModel(model.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>

          {/* Speech-to-Text Preview */}
          <div className="rounded-2xl p-5" style={{ backgroundColor: '#0F172A' }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-white text-sm">Speech-to-Text Preview</h3>
              <button
                className="px-4 py-1.5 rounded-full text-xs font-semibold text-white"
                style={{ backgroundColor: '#2563EB' }}
              >
                Test on Canvass App
              </button>
            </div>
            {/* Waveform visualization */}
            <div className="flex items-end justify-center gap-1 mb-6" style={{ height: 72 }}>
              {WAVEFORM.map((h, i) => (
                <div
                  key={i}
                  className="rounded-full"
                  style={{
                    width: 6,
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
                className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-all hover:opacity-90"
                style={{ backgroundColor: '#2563EB' }}
              >
                <Play size={22} fill="white" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT sidebar */}
        <div className="hidden lg:block w-72 shrink-0 space-y-4">
          {/* Usage This Month */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-700 text-sm mb-4">Usage This Month</h3>
            <div className="space-y-4">
              {[
                { label: 'Tokens Used This Month', pct: 0.7, display: `${(totalTokens / 1000).toFixed(1)}K`, color: '#2563EB' },
                { label: 'Cost', pct: 1.0, display: '$42.50', color: '#F59E0B' },
                { label: 'Best Breakdown Betmore', pct: 0.2, display: '-20%', color: '#EF4444' },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-500 font-medium">{item.label}</span>
                    <span className="font-bold text-slate-700">{item.display}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
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
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-700 text-sm mb-4">Advanced AI Configuration</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Model Temperature</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="2"
                  value={temperature}
                  onChange={e => setTemperature(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Max Tokens</label>
                <div className="relative">
                  <select
                    value={maxTokens}
                    onChange={e => setMaxTokens(e.target.value)}
                    className="w-full appearance-none border border-slate-200 rounded-xl px-3 py-2 pr-8 text-sm text-slate-700 focus:outline-none cursor-pointer"
                  >
                    {['1024', '2048', '4096', '8192', '16384'].map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                  <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Response Timeout</label>
                <div className="relative">
                  <select
                    value={responseTimeout}
                    onChange={e => setResponseTimeout(e.target.value)}
                    className="w-full appearance-none border border-slate-200 rounded-xl px-3 py-2 pr-8 text-sm text-slate-700 focus:outline-none cursor-pointer"
                  >
                    {['10s', '20s', '30s', '60s', '120s'].map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                  <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <button
                className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 mt-1"
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
