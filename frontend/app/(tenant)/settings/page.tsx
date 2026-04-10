'use client';
import { useState, useRef } from 'react';
import { api } from '@/lib/api';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Toggle } from '@/components/ui/Toggle';
import { useAuthStore } from '@/lib/store';
import { Settings, Users, Bell, Shield, Palette, Globe, Key, Save, Upload, X } from 'lucide-react';

const tabs = [
  { id: 'party', label: 'Party Profile', icon: Globe },
  { id: 'team', label: 'Team & Roles', icon: Users },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'branding', label: 'Branding', icon: Palette },
  { id: 'api', label: 'API & Integrations', icon: Key },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('party');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const { branding, user, setBranding } = useAuthStore();
  const primaryColor = branding?.primary_color || '#E30613';

  // Local branding state — editable before saving
  const [localPrimaryColor, setLocalPrimaryColor] = useState(branding?.primary_color || '#E30613');
  const [localHexInput, setLocalHexInput] = useState(branding?.primary_color || '#E30613');
  const [localLogoUrl, setLocalLogoUrl] = useState<string | null>(branding?.logo_url || null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleLogoFile = (file: File) => {
    if (!file.type.match(/^image\//)) return;
    const reader = new FileReader();
    reader.onload = (e) => setLocalLogoUrl(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleColorChange = (hex: string) => {
    setLocalPrimaryColor(hex);
    setLocalHexInput(hex);
  };
  const handleHexInput = (val: string) => {
    setLocalHexInput(val);
    if (/^#[0-9a-fA-F]{6}$/.test(val)) setLocalPrimaryColor(val);
  };

  const [notifPrefs, setNotifPrefs] = useState({
    panicAlerts: true,
    voterImport: true,
    campaignMilestone: true,
    surveyResponse: false,
    lowBattery: false,
    fundraisingGoal: true,
  });
  const toggleNotif = (key: keyof typeof notifPrefs) =>
    setNotifPrefs(p => ({ ...p, [key]: !p[key] }));

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    // Apply new branding globally — update store (persisted, so survives refresh)
    setBranding({
      name: branding?.name || 'SKNLP',
      party_name: branding?.party_name,
      logo_url: localLogoUrl,
      primary_color: localPrimaryColor,
      secondary_color: branding?.secondary_color || '#1A1A1A',
      font: branding?.font || 'Inter',
      subdomain: branding?.subdomain || 'sknlp',
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-5 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Settings</h1>
          <p className="text-sm text-slate-500">Manage your campaign account and preferences</p>
        </div>
        <Button size="sm" icon={<Save size={14} />} onClick={handleSave} loading={saving} style={{ backgroundColor: primaryColor, borderColor: primaryColor }}>
          {saved ? 'Saved!' : 'Save Changes'}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Sidebar nav */}
        <div className="w-full lg:w-48 lg:flex-shrink-0">
          <Card className="p-2">
            <div className="flex lg:flex-col flex-wrap gap-1">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 lg:gap-3 px-3 py-2 lg:py-2.5 rounded-lg text-sm font-medium text-left transition-all ${activeTab === id ? 'text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                style={activeTab === id ? { backgroundColor: primaryColor } : {}}>
                <Icon size={15} />
                <span className="whitespace-nowrap">{label}</span>
              </button>
            ))}
            </div>
          </Card>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {activeTab === 'party' && (
            <Card className="p-6">
              <h3 className="font-semibold text-slate-800 mb-5">Party Profile</h3>
              <div className="space-y-4">
                {/* Hidden file input */}
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/png,image/svg+xml,image/jpeg,image/webp"
                  className="hidden"
                  onChange={e => { const f = e.target.files?.[0]; if (f) handleLogoFile(f); }}
                />

                <div className="flex items-center gap-4 mb-6">
                  {/* Logo preview */}
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white relative overflow-hidden flex-shrink-0"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {localLogoUrl
                      ? <img src={localLogoUrl} alt="Logo" className="w-full h-full object-cover" />
                      : (branding?.party_name?.[0] || 'S')}
                    {localLogoUrl && (
                      <button
                        onClick={() => setLocalLogoUrl(null)}
                        className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80"
                        title="Remove logo"
                      >
                        <X size={10} color="white" />
                      </button>
                    )}
                  </div>

                  {/* Upload controls */}
                  <div>
                    <button
                      onClick={() => logoInputRef.current?.click()}
                      className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      <Upload size={13} />
                      {localLogoUrl ? 'Change Logo' : 'Upload Logo'}
                    </button>
                    <p className="text-xs text-slate-400 mt-1">PNG, SVG or JPG · max 2 MB</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: 'Party Name', value: branding?.party_name || 'SKNLP', placeholder: 'Party name' },
                    { label: 'Short Name / Abbreviation', value: 'SKNLP', placeholder: 'e.g. SKNLP' },
                    { label: 'Party Slogan', value: 'Building a Better Tomorrow', placeholder: 'Campaign slogan' },
                    { label: 'Party Website', value: 'https://sknlp.org', placeholder: 'https://...' },
                    { label: 'Contact Email', value: 'info@sknlp.org', placeholder: 'contact@party.org' },
                    { label: 'Phone Number', value: '+1 (869) 555-0100', placeholder: '+1 ...' },
                  ].map(({ label, value, placeholder }) => (
                    <div key={label}>
                      <label className="block text-xs font-medium text-slate-700 mb-1">{label}</label>
                      <input defaultValue={value} placeholder={placeholder} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1" />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">About the Party</label>
                  <textarea rows={3} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm resize-none" defaultValue="The St. Kitts-Nevis Labour Party has been serving the people since 1932..." />
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'branding' && (
            <Card className="p-6">
              <h3 className="font-semibold text-slate-800 mb-5">White-Label Branding</h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-2">Primary Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={localPrimaryColor}
                      onChange={e => handleColorChange(e.target.value)}
                      className="w-10 h-10 rounded-lg border border-slate-200 cursor-pointer"
                    />
                    <input
                      value={localHexInput}
                      onChange={e => handleHexInput(e.target.value)}
                      className="border border-slate-200 rounded-lg px-3 py-2 text-sm w-32 font-mono"
                    />
                    <span className="text-xs text-slate-400">Used for buttons, highlights, sidebar accent</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-2">Color Presets</label>
                  <div className="flex gap-2">
                    {['#CC0000', '#E30613', '#006400', '#1D4ED8', '#7C3AED', '#F59E0B'].map(c => (
                      <button
                        key={c}
                        onClick={() => handleColorChange(c)}
                        className="w-8 h-8 rounded-full shadow hover:scale-110 transition-transform"
                        style={{
                          backgroundColor: c,
                          border: localPrimaryColor === c ? '3px solid #0F172A' : '2px solid white',
                        }}
                        title={c}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-2">Subdomain</label>
                  <div className="flex items-center gap-2">
                    <input defaultValue={branding?.subdomain || 'sknlp'} className="border border-slate-200 rounded-lg px-3 py-2 text-sm w-32" />
                    <span className="text-sm text-slate-400">.campaign365.com</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-2">Preview</label>
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <div className="h-2 w-full" style={{ backgroundColor: localPrimaryColor }} />
                    <div className="p-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: localPrimaryColor }}>
                        {(branding?.party_name || 'SKNLP')[0]}
                      </div>
                      <span className="font-semibold text-slate-800">{branding?.party_name || 'SKNLP'} Campaign 365</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'team' && (
            <Card className="p-6">
              <h3 className="font-semibold text-slate-800 mb-5">Team Members & Roles</h3>
              <div className="space-y-3">
                {[
                  { name: 'Dr. Terrence Drew', email: 'tdrew@sknlp.org', role: 'general_secretary', status: 'active' },
                  { name: 'Konris Maynard', email: 'kmaynard@sknlp.org', role: 'campaign_director', status: 'active' },
                  { name: 'Jonel Powell', email: 'jpowell@sknlp.org', role: 'campaign_manager', status: 'active' },
                  { name: 'Marsha Henderson', email: 'mhenderson@sknlp.org', role: 'data_manager', status: 'active' },
                  { name: 'Carlos Browne', email: 'cbrowne@sknlp.org', role: 'field_organizer', status: 'inactive' },
                ].map((member, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 border border-slate-100 rounded-xl hover:bg-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: primaryColor }}>
                        {member.name[0]}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-800 truncate">{member.name}</p>
                        <p className="text-xs text-slate-400 truncate">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 pl-12 sm:pl-0">
                      <span className="text-xs px-2 py-1 bg-slate-100 rounded-full text-slate-600 capitalize">{member.role.replace(/_/g, ' ')}</span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${member.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>{member.status}</span>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" icon={<Users size={13} />} className="w-full">Invite Team Member</Button>
              </div>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card className="p-6">
              <h3 className="font-semibold text-slate-800 mb-5">Notification Preferences</h3>
              <div className="space-y-4">
                {(
                  [
                    { key: 'panicAlerts',        label: 'Panic Alerts',           desc: 'Immediate notification when a field agent triggers a panic alert' },
                    { key: 'voterImport',         label: 'Voter Import Complete',  desc: 'Notify when a CSV voter import finishes processing' },
                    { key: 'campaignMilestone',   label: 'Campaign Milestone',     desc: 'Updates when canvassing targets are reached' },
                    { key: 'surveyResponse',      label: 'New Survey Response',    desc: 'Daily digest of survey/poll responses' },
                    { key: 'lowBattery',          label: 'Low Agent Battery',      desc: "Alert when a tracked agent's battery drops below 20%" },
                    { key: 'fundraisingGoal',     label: 'Fundraising Goal',       desc: 'Notify when a donation goal is reached or updated' },
                  ] as { key: keyof typeof notifPrefs; label: string; desc: string }[]
                ).map(({ key, label, desc }) => {
                  const enabled = notifPrefs[key];
                  return (
                    <div key={key} className="flex items-start justify-between py-3 border-b border-slate-50 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-slate-800">{label}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
                      </div>
                      <Toggle on={enabled} onChange={() => toggleNotif(key)} color={primaryColor} />
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card className="p-6">
              <h3 className="font-semibold text-slate-800 mb-5">Security Settings</h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Change Password</label>
                  <div className="space-y-2">
                    <input type="password" placeholder="Current password" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                    <input type="password" placeholder="New password" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                    <input type="password" placeholder="Confirm new password" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                    <Button variant="outline" size="sm">Update Password</Button>
                  </div>
                </div>
                <div className="border-t border-slate-100 pt-5">
                  <p className="text-sm font-medium text-slate-800 mb-1">Two-Factor Authentication</p>
                  <p className="text-xs text-slate-400 mb-3">Add an extra layer of security to your account</p>
                  <Button variant="outline" size="sm">Enable 2FA</Button>
                </div>
                <div className="border-t border-slate-100 pt-5">
                  <p className="text-sm font-medium text-slate-800 mb-1">Active Sessions</p>
                  <div className="space-y-2 mt-3">
                    {[
                      { device: 'MacBook Pro — Chrome', ip: '192.168.1.4', time: 'Current session' },
                      { device: 'iPhone 15 — Safari', ip: '10.0.0.12', time: '2 hours ago' },
                    ].map((s, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg">
                        <div>
                          <p className="text-sm text-slate-700">{s.device}</p>
                          <p className="text-xs text-slate-400">{s.ip} · {s.time}</p>
                        </div>
                        {i !== 0 && <Button variant="ghost" size="sm" className="text-red-500">Revoke</Button>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'api' && (
            <Card className="p-6">
              <h3 className="font-semibold text-slate-800 mb-5">API & Integrations</h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-2">API Keys</label>
                  <div className="space-y-2">
                    {[
                      { label: 'Live API Key', value: 'ck_live_••••••••••••••••••••' },
                      { label: 'Test API Key', value: 'ck_test_••••••••••••••••••••' },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg">
                        <div className="flex-1">
                          <p className="text-xs font-medium text-slate-600">{label}</p>
                          <code className="text-sm text-slate-800 font-mono">{value}</code>
                        </div>
                        <Button variant="outline" size="sm">Reveal</Button>
                        <Button variant="ghost" size="sm">Regenerate</Button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-slate-100 pt-5">
                  <label className="block text-xs font-medium text-slate-700 mb-3">Connected Integrations</label>
                  <div className="space-y-2">
                    {[
                      { name: 'Twilio (SMS/WhatsApp)', status: 'connected', color: '#F22F46' },
                      { name: 'Pusher (Real-time)', status: 'connected', color: '#300D4F' },
                      { name: 'Mailgun (Email)', status: 'connected', color: '#F06B25' },
                      { name: 'Stripe (Payments)', status: 'disconnected', color: '#635BFF' },
                      { name: 'Google Maps', status: 'disconnected', color: '#4285F4' },
                    ].map(({ name, status, color }) => (
                      <div key={name} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                          <span className="text-sm text-slate-700">{name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${status === 'connected' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>{status}</span>
                          <Button variant="ghost" size="sm">{status === 'connected' ? 'Configure' : 'Connect'}</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
