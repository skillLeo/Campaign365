'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, Settings, Bell, Shield, Server, Mail, Save, Eye, EyeOff } from 'lucide-react';
import { Toggle } from '@/components/ui/Toggle';

const TABS = [
  { id: 'general', label: 'General', icon: Settings },
  { id: 'email', label: 'Email / SMTP', icon: Mail },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'system', label: 'System', icon: Server },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];


function Field({ label, value, type = 'text', readOnly = false }: { label: string; value: string; type?: string; readOnly?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-500 mb-1.5">{label}</label>
      <input
        type={type}
        defaultValue={value}
        readOnly={readOnly}
        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-teal-400 transition-colors"
        style={readOnly ? { backgroundColor: '#F8FAFC', fontFamily: 'monospace' } : {}}
      />
    </div>
  );
}

export default function SuperSettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [maintenance, setMaintenance] = useState(false);

  const [security, setSecurity] = useState({
    twofa: true,
    rateLimit: true,
    https: true,
    keyRotation: false,
    ipAllowlist: false,
  });

  const [notifications, setNotifications] = useState({
    newTenant: true,
    paymentFailure: true,
    systemError: true,
    panic: false,
    usageLimits: true,
  });

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 700));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Top bar */}
      <div className="px-4 md:px-6 py-4 bg-white border-b border-slate-100">
        <div className="flex items-center gap-1 text-xs text-slate-400 mb-2">
          <button onClick={() => router.push('/super/dashboard')} className="hover:text-slate-600 transition-colors">
            Dashboard
          </button>
          <ChevronRight size={12} />
          <span className="text-slate-600 font-medium">Settings</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-xl font-bold text-slate-800">Platform Settings</h1>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-70"
            style={{ backgroundColor: saved ? '#16A34A' : '#2563EB' }}
          >
            <Save size={14} className={saving ? 'animate-pulse' : ''} />
            {saving ? 'Saving…' : saved ? 'Saved ✓' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-5">
          {/* Sidebar tabs */}
          <div className="w-full md:w-48 shrink-0">
            <div className="bg-white rounded-2xl border border-slate-100 p-2 space-y-0.5">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all"
                  style={activeTab === id
                    ? { backgroundColor: '#2563EB', color: 'white' }
                    : { color: '#64748B' }}
                >
                  <Icon size={14} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Content panel */}
          <div className="flex-1">
            {activeTab === 'general' && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
                <h3 className="font-semibold text-slate-800">General Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Platform Name" value="Campaign 365" />
                  <Field label="Platform URL" value="https://campaign365.com" />
                  <Field label="Support Email" value="support@campaign365.com" />
                  <Field label="Default Timezone" value="America/St_Kitts" />
                  <Field label="Default Language" value="en" />
                  <Field label="Default Currency" value="USD" />
                </div>
                <div className="flex items-center justify-between py-3 border-t border-slate-100">
                  <div>
                    <p className="text-sm font-medium text-slate-700">Maintenance Mode</p>
                    <p className="text-xs text-slate-400 mt-0.5">Temporarily disable the platform for all tenants</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400">{maintenance ? 'Platform offline' : 'Platform live'}</span>
                    <Toggle on={maintenance} onChange={() => setMaintenance(!maintenance)} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'email' && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
                <h3 className="font-semibold text-slate-800">Email / SMTP Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Mail Driver" value="smtp" />
                  <Field label="SMTP Host" value="smtp.ses.amazonaws.com" />
                  <Field label="SMTP Port" value="465" />
                  <Field label="SMTP Username" value="AKIAIOSFODNN7EXAMPLE" />
                  <Field label="From Name" value="Campaign 365" />
                  <Field label="From Email" value="noreply@campaign365.com" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">SMTP Password</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type={showPass ? 'text' : 'password'}
                        defaultValue="super_secret_pass_2025"
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none pr-10"
                      />
                      <button
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                    <button className="px-4 py-2 rounded-xl text-sm font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all">
                      Test Connection
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-1">
                <h3 className="font-semibold text-slate-800 mb-4">Security Configuration</h3>
                {[
                  { key: 'twofa', label: 'Enforce 2FA for Super Admins', desc: 'All super admin accounts must use 2FA' },
                  { key: 'rateLimit', label: 'Rate Limiting on Auth Endpoints', desc: 'Block IPs after 10 failed login attempts' },
                  { key: 'https', label: 'Subdomain HTTPS Enforcement', desc: 'Redirect all HTTP to HTTPS automatically' },
                  { key: 'keyRotation', label: 'API Key Rotation Reminder', desc: 'Remind super admins to rotate keys every 90 days' },
                  { key: 'ipAllowlist', label: 'IP Allowlist for Super Admin', desc: 'Restrict super admin login to specific IPs' },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-start justify-between py-3.5 border-b border-slate-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-slate-800">{label}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
                    </div>
                    <Toggle
                      on={security[key as keyof typeof security]}
                      onChange={() => setSecurity(s => ({ ...s, [key]: !s[key as keyof typeof s] }))}
                    />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'system' && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
                <h3 className="font-semibold text-slate-800">System Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Queue Driver" value="redis" readOnly />
                  <Field label="Cache Driver" value="redis" readOnly />
                  <Field label="Session Driver" value="redis" readOnly />
                  <Field label="Broadcast Driver" value="pusher" readOnly />
                  <Field label="Storage Driver" value="s3" readOnly />
                  <Field label="Log Channel" value="daily" readOnly />
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {['Clear Cache', 'Run Queue Worker', 'View Logs', 'Run Migrations'].map(action => (
                    <button
                      key={action}
                      className="px-4 py-2 rounded-xl text-sm font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-1">
                <h3 className="font-semibold text-slate-800 mb-4">Admin Notification Preferences</h3>
                {[
                  { key: 'newTenant', label: 'New Tenant Signup', desc: 'Notify when a new client signs up' },
                  { key: 'paymentFailure', label: 'Payment Failure', desc: 'Alert when a subscription payment fails' },
                  { key: 'systemError', label: 'System Error (5xx)', desc: 'Alert on critical server errors' },
                  { key: 'panic', label: 'Panic Button Triggered', desc: 'Notify super admins of any panic alert' },
                  { key: 'usageLimits', label: 'Tenant Exceeds Usage Limits', desc: 'Warn when a tenant approaches their plan limits' },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-start justify-between py-3.5 border-b border-slate-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-slate-800">{label}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
                    </div>
                    <Toggle
                      on={notifications[key as keyof typeof notifications]}
                      onChange={() => setNotifications(n => ({ ...n, [key]: !n[key as keyof typeof n] }))}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
